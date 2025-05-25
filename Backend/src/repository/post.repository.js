const db = require('../database/pg.database');


// Retrieve all posts
// No req.body
exports.getAll = async() => {
    try {
        const res = await db.query(
            "SELECT thread.id as thread_id, thread.name as thread_name, post.id as post_id, post.comment as comment, post.score as score, post.created_at as post_date, users.name as username, users.profile_picture as profile_picture FROM post LEFT JOIN users on post.user_id = users.id LEFT JOIN thread ON post.thread_id = thread.id;"
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Retrieve a post based on post_id
// raw req.body
//     {
//         "post_id":
//     }
exports.getById = async(post_id) => {
    let res;
    try {
        res = await db.query(
            "SELECT * FROM post LEFT JOIN film ON film.id = ($1);",
            [post_id]
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}


// User creates a post
// raw req.body
//     {
//         "name":,
//         "film_id": <OPTIONAL>,
//         "original_poster_id":,
//         "post_info":
//     }
exports.createPost = async(post) => {
    try {
        let res;
        // Return the post
        if(!post.film_id) {
            res = await db.query(
                "INSERT INTO post (name, original_poster_id, post_info) VALUES ($1, $2, $3) RETURNING *;",
                [post.name, post.original_poster_id, post.post_info]
            );
        } else {
            res = await db.query(
                "INSERT INTO post (name, film_id, original_poster_id, post_info) VALUES ($1, $2, $3, $4) RETURNING *;",
                [post.name, post.film_id, post.original_poster_id, post.post_info]
            );
        }
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// User updates a post
// form-data req.body
//     {
//         "name":,
//         "image": <OPTIONAL> {IMAGE FILE}
//     }
exports.updatePost = async(post) => {
    try {
        let res;
        // Return the post
        if(!post.film_id) {
            res = await db.query(
                "UPDATE post SET name = ($1), original_poster_id = ($2), post_info = ($3) RETURNING *;",
                [post.name, post.original_poster_id, post.post_info]
            );
        } else {
            res = await db.query(
                "UPDATE post SET name = ($1), film_id = ($2) original_poster_id = ($3), post_info = ($4) RETURNING *;",
                [post.name, post.film_id, post.original_poster_id, post.post_info]
            );
        }
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Delete post by post ID
// raw req.body
//     {
//         "id":
//     }
exports.deletePost = async(id) => {
    try {
        const res = await db.query(
            "DELETE FROM post WHERE id = ($1) RETURNING *;",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}