const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({ 
  text: { 
    type: String, 
    required: true 
  },
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required :true,
  },
  datePosted: { 
    type: Date, 
    default: Date.now 
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
