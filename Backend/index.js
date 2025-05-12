const express = require('express');
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 3000;

// Cloudinary
const cloudinary =  require("cloudinary");

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
});

app.use(express.json());
app.use('/store', require('./src/routes/store.routes'));
app.use('/user', require('./src/routes/user.routes'));
app.use('/item', require('./src/routes/item.routes'));
app.use('/transaction', require('./src/routes/transaction.routes'));

const server = app.listen(PORT, () => {
    console.log('Run Port', PORT);
});

// NeonDB
const http = require("http");
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);