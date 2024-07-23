const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post: {
      type: String,
      required: true
    }
  });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;