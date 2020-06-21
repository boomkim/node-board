const mongoose = require('mongoose');

const post_schema = new mongoose.Schema({ 
    title: String,
    author: String,
    password: String,
    date: {type: Date, default: Date.now },
    likes: Number,
    body: String
});

module.exports = mongoose.model('posts', post_schema);