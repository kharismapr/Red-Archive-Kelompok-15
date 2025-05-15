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




// Retrieve all reviews
// No req.body
exports.getAll = async() => {
    try {
        const res = await db.query(
            "SELECT * FROM review;"
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Retrieve a review based on film ID or user_id or both
// raw req.body
//     {
//         "user_id": <OPTIONAL>
//         "film_id": <OPTIONAL>
//     }
exports.getSpecific = async(film_id, user_id) => {
    let res;
    try {
        if(!film_id && user_id) {
            res = await db.query(
                "SELECT * FROM review WHERE user_id = ($1);",
                [user_id]
            );
        } else if (film_id && !user_id) {
            res = await db.query(
                "SELECT * FROM review WHERE film_id = ($1);",
                [film_id]
            );
        } else {
            res = await db.query(
                "SELECT * FROM review WHERE film_id = ($1) AND user_id = ($2);",
                [film_id, user_id]
            );
        }
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// User creates a review of a certain film
// raw req.body
//     {
//         "film_id":,
//         "user_id":,
//         "rating":,
//         "details":
//     }
//       - "details" is an elaboration text the user gives in their review
//           if empty pass ""
exports.createReview = async(review) => {
    try {
        const res = await db.query(
            "INSERT INTO review (film_id, user_id, rating, details) VALUES ($1, $2, $3, $4) RETURNING *;",
            [review.film_id, review.user_id, review.rating, review.details]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}


// Edits a review in the database
// raw req.body
//     {
//         "review_id":,
//         "film_id":,
//         "user_id":,
//         "rating":,
//         "details":
//     }
exports.updateFilm = async(review) => {
    let res;
    try {
        res = await db.query(
            "UPDATE review SET film_id = ($1), user_id = ($2), rating = ($3), details = ($4) WHERE id = ($5) RETURNING *;",
            [review.film_id, review.user_id, review.rating, review.details, review.review_id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Delete review by ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteUser = async(id) => {
    try {
        const res = await db.query(
            "DELETE FROM review WHERE id = ($1) RETURNING *;",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}