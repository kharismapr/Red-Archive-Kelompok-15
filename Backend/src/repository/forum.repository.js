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




// Retrieve all forums
// No req.body
exports.getAll = async() => {
    try {
        const res = await db.query(
            "SELECT * FROM forum;"
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Retrieve a forum based on forum_id
// raw req.body
//     {
//         "forum_id":
//     }
exports.getById = async(forum_id) => {
    let res;
    try {
        res = await db.query(
            "SELECT * FROM forum WHERE id = ($1);",
            [forum_id]
        );
        return res.rows;
    } catch (error) {
        console.log("Error qry ", error);
    }
}


// User creates a forum
// form-data req.body
//     {
//         "name":,
//         "image": {IMAGE FILE}
//     }
exports.createForum = async(forum) => {
    try {
        const image = forum.file;
        const imageBase64 = "data:"+image.mimetype+";base64,"+image.buffer.toString('base64');
        const i = imageBase64.toString();
        const file64 = parser.format(i, forum.file.buffer);
        const result = await cloudinary.v2.uploader.upload(file64.content);
        // Return the forum
        const res = await db.query(
            "INSERT INTO forum (name, cover_picture) VALUES ($1, $2) RETURNING *;",
            [forum.user_id, result.url]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// User updates a forum
// form-data req.body
//     {
//         "name":,
//         "image": <OPTIONAL> {IMAGE FILE}
//     }
exports.updateForum = async(forum) => {
    try {
        let res;
        if(!forum.file) {
            const image = forum.file;
            const imageBase64 = "data:"+image.mimetype+";base64,"+image.buffer.toString('base64');
            const i = imageBase64.toString();
            const file64 = parser.format(i, forum.file.buffer);
            const result = await cloudinary.v2.uploader.upload(file64.content);
            // Return the forum
            res = await db.query(
                "UPDATE forum SET name = ($1), cover_picture = ($2) RETURNING *;",
                [forum.user_id, result.url]
            );
        } else {
            res = await db.query(
                "UPDATE forum SET name = ($1) RETURNING *;",
                [forum]
            );
        }
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Delete forum by forum ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteForum = async(id) => {
    try {
        const res = await db.query(
            "DELETE FROM forum WHERE id = ($1) RETURNING *;",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}