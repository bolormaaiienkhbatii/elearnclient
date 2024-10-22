const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    status:String
  })
);

module.exports = Post;