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


// Registers user's data into the database
// raw req.body
// {
//     "name":,
//     "email":,
//     "password":
// }
exports.registerUser = async(user) => {
    try {
        const res = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;",
            [user.name, user.email, user.password]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}


// Checks wheter there is a user with the following email and password
// raw req.body
// {
//     "email":,
//     "password":
// }
exports.loginUser = async(email) => {
    try {
        const res = await db.query(
            "SELECT * FROM users WHERE email = ($1);",
            [email]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Retrieves user by e-mail
// raw req.body
// {
//     "email":,
// }
exports.getEmail = async(email) => {
    try {
        const res = await db.query(
            "SELECT * FROM users WHERE email = ($1);",
            [email]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Updates data of specific user
// raw req.body
//     {
//         "id":,
//         "user":,
//         "email":,
//         "password":,
//         "description":
//     }
exports.updateUser = async(user) => {
    try {
            const res = await db.query(
            "UPDATE users SET name = ($1), email = ($2), password = ($3), description = ($4) WHERE id = ($5) RETURNING *;",
            [user.name, user.email, user.password, user.description, user.id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Overwrites profile picture of user
// form-data req.body
//     {
//         "id":,
//         "image": {IMAGE FILE}
//     }
exports.uploadProfile = async(user) => {
    try {
        const image = user.file;
        const imageBase64 = "data:"+image.mimetype+";base64,"+image.buffer.toString('base64');
        const i = imageBase64.toString();
        const file64 = parser.format(i, user.file.buffer);
        const result = await cloudinary.v2.uploader.upload(file64.content);
        const res = await db.query(
            "UPDATE users SET profile_picture = ($1) WHERE id = ($2) RETURNING *;",
            [result.url, user.body.id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}



// Delete user by ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteUser = async(id) => {
    try {
        const res = await db.query(
            "DELETE FROM users WHERE id = ($1) RETURNING *;",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.log("Error qry ", error);
    }
}