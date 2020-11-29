const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:  String,
    tech: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    hidden: Boolean,
    meta: {
      stars: Number,
    }
},{timestamps: true});

module.exports = mongoose.model('Post', blogSchema);