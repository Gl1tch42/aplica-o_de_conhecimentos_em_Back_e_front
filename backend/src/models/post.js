const mongoose = require('mongoose');
const { ObjectId } = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:  String,
    tech: String,
    author: {
      name: String,
      id: String,
    },
    user_id: {
      type: ObjectId,
      ref: "User"
    },
    body: String,
    comments: [{ 
      body: String, 
      author: {
        name: String,
        id: String,
      }
    },{timestamps: true}],
    meta: {
      stars: Number,
    }
},{timestamps: true});


module.exports = mongoose.model('Post', blogSchema);