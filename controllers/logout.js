module.exports = (req, res) =>{

    req.session.destroy();

    //Get the referer URL from the req headers
    const referer = req.headers.referer || '/';

    if(referer.includes('/posts/new')){

        return res.redirect('/blog')  //If it was from /posts/new then go to the blog page
    }
    return res.redirect(referer);   
}