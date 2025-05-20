const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// NeonDB
const http = require("http");
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

// Cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
});

app.use(express.json());
app.use('/user', require('./src/routes/user.routes'));
app.use('/film', require('./src/routes/film.routes'));
app.use('/review', require('./src/routes/review.routes'));
app.use('/archive', require('./src/routes/archive.routes'));
app.use('/forum', require('./src/routes/forum.routes'));
app.use('/thread', require('./src/routes/thread.routes'));
app.use('/post', require('./src/routes/post.routes'));

const server = app.listen(PORT, () => {
    console.log('Run Port', PORT);
});
