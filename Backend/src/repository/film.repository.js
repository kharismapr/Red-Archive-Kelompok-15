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
            "SELECT id,name,genre,(total_rating::real/(reviews::real)) AS rating,duration,release_date,actor_name,director_name,cover_picture FROM film;"
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
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
        if(!req.file) {
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