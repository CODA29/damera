const express = require('express')
const ejs = require('ejs')
const app = new express() 
const bodyParser = require('body-parser')
const validateMiddleware = require('./views/middleware/validationMiddleware');
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const newPostController = require('./controllers/newPost')
const blogController = require('./controllers/blog')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const sucessController = require('./controllers/success')
const portfolioController = require('./controllers/portfolio')
const storeUserController = require('./controllers/storeUser')
const storeMessageController = require('./controllers/storeMessage')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const redirectIfAuthenticatedMiddleware = require('./views/middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash');
app.set('view engine','ejs')
global.loggedIn = null;
app.use(express.static('public'))
app.use(fileUpload())
app.use('/posts/store', validateMiddleware)
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(flash());
mongoose.connect('mongodb+srv://mickysemu18:Hebist18@cluster0.s4vx6.mongodb.net/damera_database?retryWrites=true&w=majority', {useNewUrlParser: true })
let port = process.env.PORT;
if (port == null || port == ""){
    port = 6000;
};
app.listen(port, ()=>{
  console.log('App listening... ')
}) 
app.listen(4000, ()=>{
    console.log('App listening...') 
});
app.post('/users/register', storeUserController)
app.post('/messages/send', storeMessageController)
app.get('/posts/new', newPostController)
app.get('/', homeController)
app.get('/portfolio', portfolioController)
app.get('/blog', blogController)
app.get('/sucess/', sucessController)
app.post('/posts/store', storePostController)
app.get('/display/:id', getPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', loginController)
app.post('/users/login',loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));
// Add this after the existing routes
app.post('/posts/comment/:id', (req, res) => {
    const commentText = req.body.comment;
    const blogPostId = req.params.id;
    const userId = req.session.userId;

    if (!commentText) {
        req.flash('error', 'Comment cannot be empty.');
        return res.redirect(`/display/${blogPostId}`);
    }

    BlogPost.findById(blogPostId, (err, blogpost) => {
        if (err || !blogpost) {
            req.flash('error', 'Blog post not found.');
            return res.redirect('/blog');
        }

        blogpost.comments.push({
            text: commentText,
            userid: userId
        });

        blogpost.save((err, updatedBlogPost) => {
            if (err) {
                req.flash('error', 'Error adding comment. Please try again.');
                return res.redirect(`/display/${blogPostId}`);
            }

            req.flash('success', 'Comment added successfully.');
            res.redirect(`/display/${blogPostId}`);
        });
    });
});
