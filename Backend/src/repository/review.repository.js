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
                `SELECT 
                    r.*,
                    u.name as user_name
                FROM review r
                JOIN users u ON r.user_id = u.id
                WHERE r.user_id = $1`,
                [user_id]
            );
        } else if (film_id && !user_id) {
            res = await db.query(
                `SELECT 
                    r.*,
                    u.name as user_name
                FROM review r
                JOIN users u ON r.user_id = u.id
                WHERE r.film_id = $1`,
                [film_id]
            );
        } else {
            res = await db.query(
                `SELECT 
                    r.*,
                    u.name as user_name
                FROM review r
                JOIN users u ON r.user_id = u.id
                WHERE r.film_id = $1 AND r.user_id = $2`,
                [film_id, user_id]
            );
        }
        
        // Transform response to match frontend expectations
        return res.rows.map(review => ({
            id: review.id,
            film_id: review.film_id,
            user_id: review.user_id,
            user_name: review.user_name,
            rating: review.rating,
            comment: review.details,
            created_at: review.created_at
        }));
    } catch (error) {
        console.log("Error in getSpecific: ", error);
        throw error;
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
        // Start a transaction since we're updating multiple tables
        await db.query('BEGIN');

        try {
            // Insert the review
            const reviewResult = await db.query(
                `INSERT INTO review (film_id, user_id, rating, details, created_at) 
                 VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) 
                 RETURNING *;`,
                [review.film_id, review.user_id, review.rating, review.details]
            );

            // Update the film's total rating and review count
            await db.query(
                `UPDATE film 
                 SET total_rating = total_rating + $1, 
                     reviews = reviews + 1 
                 WHERE id = $2`,
                [review.rating, review.film_id]
            );

            // Commit the transaction
            await db.query('COMMIT');

            // Get user info for the response
            const userResult = await db.query(
                'SELECT name as user_name FROM users WHERE id = $1',
                [review.user_id]
            );

            // Return review with user info
            return {
                ...reviewResult.rows[0],
                user_name: userResult.rows[0]?.user_name || 'Anonymous'
            };

        } catch (error) {
            // If anything fails, rollback the transaction
            await db.query('ROLLBACK');
            throw error;
        }
    } catch (error) {
        console.log("Error in createReview: ", error);
        throw error;
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
exports.updateReview = async(review) => {
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
exports.deleteReview = async(id) => {
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