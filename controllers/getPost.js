const BlogPost = require('../models/BlogPost.js')
const Comment = require('../models/Comment.js')
const getPost = async (req, res) => {
    try {
        const blogpostId = req.params.id;
        const blogpost = await BlogPost.findById(blogpostId).populate({
            path: 'comments',
            populate:{
                path:'userid',
                select: 'username' // Only fetch the 'username' field of the related user
            }
        });


        if (!blogpost) {
            req.flash('error', 'Blog post not found.');
            return res.redirect('/blog');
        }
        console.log("loggedIn:", req.session.userId ? true : false); // Add this line

        res.render('display', {
            blogpost,
            loggedIn: req.session.userId ? true : false // Pass the loggedIn status to the view
            
        });
       
    } catch (error) {
        req.flash('error', 'Error fetching blog post.');
        res.redirect('/blog');
    }
};
const addComment = async (req, res) => {
    try {
        const commentText = req.body.comment;
        const blogPostId = req.params.id;
        const userId = req.session.userId;

        if (!commentText) {
            req.flash('error', 'Comment cannot be empty.');
            return res.redirect(`/display/${blogPostId}`);
        }
        const comment = new Comment({
            text: commentText,
            userid: userId,
        });
        

        await comment.save();

        const blogPost = await BlogPost.findById(blogPostId);
        if (!blogPost) {
            req.flash('error', 'Blog post not found.');
            return res.redirect('/blog');
        }

        blogPost.comments.push(comment);
        await blogPost.save();

        
        req.flash('success', 'Comment added successfully.');
        res.redirect(`/display/${blogPostId}`);
    } catch (error) {
        req.flash('error', 'Error adding comment. Please try again.');
        res.redirect(`/display/${req.params.id}`);
    }
};


module.exports = {
    getPost,
    addComment
};