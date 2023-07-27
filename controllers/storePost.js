const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports = (req,res)=>{

    let image = req.files.image;
    console.log('Image:', image);
    const destinationPath = path.resolve(__dirname, '..', 'public', 'img');
    image.mv(
        path.join(destinationPath, image.name), 
        async (error) =>{
        await BlogPost.create({
            ...req.body, 
            image: '/img/' + image.name,
            userid: req.session.userId
        
        }); 
        res.redirect('/blog');
    })

}