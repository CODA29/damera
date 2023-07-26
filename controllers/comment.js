const Comment = require('../models/Comment.js');
const BlogPost = require('../models/BlogPost.js');

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            req.flash('error', 'Comment not found.');
            return res.redirect('/blog');
        }

        const blogPost = await BlogPost.findById(comment.blogpost);
        if (!blogPost) {
            req.flash('error', 'Blog post not found.');
            return res.redirect('/blog');
        }

        // Check if the current user is the author of the comment
        if (req.session.userId && comment.userid.toString() === req.session.userId) {
            await comment.remove();
            // Remove the comment from the BlogPost's comments array
            blogPost.comments = blogPost.comments.filter((cmt) => cmt.toString() !== commentId);
            await blogPost.save();

            req.flash('success', 'Comment deleted successfully.');
        } else {
            req.flash('error', 'You are not authorized to delete this comment.');
        }

        res.redirect(`/display/${blogPost._id}`);
    } catch (error) {
        req.flash('error', 'Error deleting comment. Please try again.');
        res.redirect('/blog');
    }
};

module.exports = {
    deleteComment,
};
