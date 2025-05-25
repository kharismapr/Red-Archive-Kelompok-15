const db = require('../database/pg.database');

require('dotenv').config;
const cloudinary =  require("cloudinary");
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
});
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();



// Retrieve all films
// raw req.body
//     {
//     }
exports.getAll = async() => {
    try {
        const res = await db.query(
            `SELECT 
                id,
                name as title,
                genre,
                description as synopsis,
                CASE 
                    WHEN reviews > 1 THEN (total_rating::real/(reviews::real-1))::numeric(10,1) 
                    ELSE 0 
                END AS rating,
                duration,
                release_date,
                actor_name,
                director_name,
                cover_picture as image,
                ARRAY[genre] as genres
            FROM film`
        );
        
        // Transform the data to match frontend requirements
        return res.rows.map(film => ({
            ...film,
            genres: film.genre.split(',').map(g => g.trim()),
            directors: [film.director_name],
            duration: {
                hours: parseInt(film.duration.hours) || 0,
                minutes: parseInt(film.duration.minutes) || 0,
                seconds: parseInt(film.duration.seconds) || 0
            }
        }));
    } catch (error) {
        console.log("Error qry ", error);
        throw error;
    }
}



// Retrieve a film based on ID
// raw req.body
//     {
//         "film_id":
//     }
exports.getById = async(film_id) => {
    try {
        const res = await db.query(
            "SELECT id,name,genre,(total_rating::real/(reviews::real-1)) AS rating,duration,release_date,actor_name,director_name,cover_picture FROM film WHERE id = ($1);",
            [film_id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Inserts a film into the database
// form-data req.body
//     {
//         "image": {FILE},
//         "name": {TEXT},
//         "genre": {TEXT},
//         "duration": {TEXT},
//         "actor_name": {TEXT},
//         "director_name": {TEXT},
//         "release_date": {TEXT},
//     }
//       - Image for cover_picture
//       - Format of "duration":
//           (Insert 0 if non-applicable)
//            HH:MM:SS
//       - Format of "release_date":
//            'YYYY-MM-DD'
exports.insertFilm = async(film) => {
    try {
        const image = film.file;
        const imageBase64 = "data:"+image.mimetype+";base64,"+image.buffer.toString('base64');
        const i = imageBase64.toString();
        const file64 = parser.format(i, film.file.buffer);
        const result = await cloudinary.v2.uploader.upload(file64.content);
        const res = await db.query(
            "INSERT INTO film (name, genre, duration, release_date, actor_name, director_name, cover_picture) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
            [film.body.name, film.body.genre, film.body.duration, film.body.release_date, film.body.actor_name, film.body.director_name, result.url]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}


// Edits a film in the database
// form-data req.body
//     {
//         "id": {TEXT},
//         "image": {FILE} <OPTIONAL>,
//         "name": {TEXT},
//         "genre": {TEXT},
//         "duration": {TEXT},
//         "actor_name": {TEXT},
//         "director_name": {TEXT},
//         "release_date": {TEXT},
//     }
//       - Format is the same as insertFilm()
exports.updateFilm = async(film) => {
    let res;
    try {
        if(!film.file) {
            res = await db.query(
                "UPDATE film SET name = ($1), genre = ($2), duration = ($3), release_date = ($4), actor_name = ($5), director_name = ($6) WHERE id = ($7) RETURNING *;",
                [film.body.name, film.body.genre, film.body.duration, film.body.release_date, film.body.actor_name, film.body.director_name, film.body.id]
            );
        } else {
            const image = film.file;
            const imageBase64 = "data:"+image.mimetype+";base64,"+image.buffer.toString('base64');
            const i = imageBase64.toString();
            const file64 = parser.format(i, film.file.buffer);
            const result = await cloudinary.v2.uploader.upload(file64.content);
            res = await db.query(
                "UPDATE film SET name = ($1), genre = ($2), duration = ($3), release_date = ($4), actor_name = ($5), director_name = ($6), cover_picture = ($7) WHERE id = ($8) RETURNING *;",
                [film.body.name, film.body.genre, film.body.duration, film.body.release_date, film.body.actor_name, film.body.director_name, result.url, film.body.id]
            );
        }
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Delete film by ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteUser = async(id) => {
    try {
        const res = await db.query(
            "DELETE FROM film WHERE id = ($1) RETURNING *;",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}


// Get film by slug (converted from name)
exports.getBySlug = async(slug) => {
    try {
        // Convert slug back to potential film name by replacing hyphens with spaces
        const possibleName = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        
        const res = await db.query(
            `SELECT id, name as title, genre, description as synopsis,
                CASE 
                    WHEN reviews > 1 THEN (total_rating::real/(reviews::real-1))::numeric(10,1) 
                    ELSE 0 
                END AS rating, duration, release_date, actor_name, director_name, cover_picture as image
            FROM film 
            WHERE LOWER(name) = LOWER($1)`,
            [possibleName]
        );
        
        if (res.rows[0]) {
            const film = res.rows[0];
            // Transform the data to match frontend requirements
            return {
                ...film,
                genres: film.genre.split(',').map(g => g.trim()),
                directors: [film.director_name],
                actors: film.actor_name.split(',').map(a => a.trim())
            };
        }
        return null;
    } catch (error) {
        console.log("Error qry ", error);
        throw error;
    }
}