const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
  // You can set a default image URL here if you want to display a default image for all posts
  
  try {
    await BlogPost.create({
      ...req.body,
      // Set the image field to a default value or an empty string
      image: '',
      userid: req.session.userId,
    });

    res.redirect('/blog');
  } catch (error) {
    console.error('Error creating blog post:', error);
    // Handle the error (e.g., show an error message or redirect to an error page)
  }
};
