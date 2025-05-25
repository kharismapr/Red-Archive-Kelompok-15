const db = require('../database/pg.database');


// Retrieve all threads
// No req.body
exports.getAll = async() => {
    try {
        const res = await db.query(
            "SELECT users.profile_picture as profile_picture, thread.name as name, thread.name as thread_name, thread.thread_info as thread_info, users.name as username, post.created_at as created_at FROM thread LEFT JOIN forum on thread.forum_id = forum.id LEFT JOIN post on forum.last_post_id = post.id LEFT JOIN users on post.user_id = users.id;"
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Retrieve a thread based on thread_id
// raw req.body
//     {
//         "thread_id":
//     }
exports.getById = async(thread_id) => {
    let res;
    try {
        res = await db.query(
            "SELECT * FROM thread LEFT JOIN film ON film.id = ($1);",
            [thread_id]
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}


// User creates a thread
// raw req.body
//     {
//         "name":,
//         "film_id": <OPTIONAL>,
//         "original_poster_id":,
//         "forum_id":,
//         "thread_info":
//     }
exports.createThread = async(thread) => {
    try {
        let res;
        // Return the thread
        if(!thread.film_id) {
            res = await db.query(
                "INSERT INTO thread (name, original_poster_id, thread_info, forum_id) VALUES ($1, $2, $3, $4) RETURNING *;",
                [thread.name, thread.original_poster_id, thread.thread_info, thread.forum_id]
            );
        } else {
            res = await db.query(
                "INSERT INTO thread (name, film_id, original_poster_id, thread_info, forum_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
                [thread.name, thread.film_id, thread.original_poster_id, thread.thread_info, thread.forum_id]
            );
        }
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// User updates a thread
// form-data req.body
//     {
//         "name":,
//         "image": <OPTIONAL> {IMAGE FILE}
//     }
exports.updateThread = async(thread) => {
    try {
        let res;
        // Return the thread
        if(!thread.film_id) {
            res = await db.query(
                "UPDATE thread SET name = ($1), original_poster_id = ($2), thread_info = ($3) RETURNING *;",
                [thread.name, thread.original_poster_id, thread.thread_info]
            );
        } else {
            res = await db.query(
                "UPDATE thread SET name = ($1), film_id = ($2) original_poster_id = ($3), thread_info = ($4) RETURNING *;",
                [thread.name, thread.film_id, thread.original_poster_id, thread.thread_info]
            );
        }
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Delete thread by thread ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteThread = async(id) => {
    try {
        const res = await db.query(
            "DELETE FROM thread WHERE id = ($1) RETURNING *;",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}