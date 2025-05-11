const express = require('express');
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 3000;

// Cloudinary
const cloudinary =  require("cloudinary");

// Configuration
cloudinary.config({ 
    cloud_name: 'drm5dmz1y', 
    api_key: '324884558852625', 
    api_secret: 'I0ofYtglG27-NqszhcDVXk_IvsE'
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