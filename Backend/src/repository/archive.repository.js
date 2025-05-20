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




// Retrieve all archives
// No req.body
exports.getAll = async() => {
    try {
        const res = await db.query(
            "SELECT * FROM archive;"
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Retrieve a archive based on user_id
// raw req.body
//     {
//         "user_id":
//     }
exports.getByUser = async(user_id) => {
    let res;
    try {
        res = await db.query(
            "SELECT rating,review.details AS review_details, film.name AS film_name,users.name AS username,film.cover_picture,release_date FROM archive INNER JOIN review ON archive.review_id = review.id INNER JOIN film ON review.film_id = film.id INNER JOIN users ON users.id = ($1);",
            [user_id]
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// User creates a archive of a certain film
// raw req.body
//     {
//         "user_id":,
//         "review_id":
//     }
exports.createArchive = async(archive) => {
    try {
        // Return the archive
        const res = await db.query(
            "INSERT INTO archive (user_id, review_id) VALUES ($1, $2) RETURNING *;",
            [archive.user_id, archive.review_id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}


// Delete archive by archive ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteArchive = async(id) => {
    try {
        const res = await db.query(
            "DELETE FROM archive WHERE id = ($1) RETURNING *;",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}