const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Comment = require('./Comment');

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted:{
        type: Date,
        default: new Date()
    },
    image: String,
    comments: [Comment.schema] // Use the Comment schema for comments

});
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;