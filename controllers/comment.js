const Comment = require('../models/Comment.js');
const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    const referer = req.headers.referer || '/';
    try {
        const commentId = req.params.id;
        const userId = req.session.userId;
        

        const comment = await Comment.findById(commentId);

        if (!comment || comment.userid.toString() !== userId) {
            
            return res.status(403).json({error: 'You are not authorized to delete this comment'});
        }

        await comment.remove();

        const deletedComment = await Comment.findByIdAndRemove(commentId);
        
        
        const blogpostId = deletedComment.blogpost;
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(
            blogpostId,
            { $pull: { comments: commentId } },
            { new: true } // Return the updated document after the update
          );
      
          if (!updatedBlogPost) {
            // Handle the case when the blog post is not found after the comment deletion
            req.flash('error', 'Blog post not found.');
            return res.redirect('/blog');
          }

        // Return a success response
        //return res.status(200).json({ message: 'Comment deleted successfully.' });
        res.redirect(`/display/${blogpostId}`);
        
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the comment.' });
    }
    
};

