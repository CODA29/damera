require('dotenv').config();
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
const commentController = require('./controllers/comment')
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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
// Middleware to set the loggedIn variable
app.use((req,res,next)=>{
    res.locals.loggedIn = req.session.userId ? req.session.userId.toString() : null;
    next();
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(flash());
let port = process.env.PORT || 4000;
app.listen(port, ()=>{
  console.log('App listening... ')
}) 
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true })
.then(()=>console.log("Connected To Database"))
.catch((error)=> console.error('Error connecting to MongoDB:', error))

app.post('/users/register', storeUserController)
app.post('/messages/send', storeMessageController)
app.get('/posts/new', newPostController)
app.get('/', homeController)
app.get('/portfolio', portfolioController)
app.get('/blog', blogController)
app.get('/sucess/', sucessController)
app.post('/posts/store', storePostController)
app.post('/posts/comment/:id', getPostController.addComment)
app.get('/display/:id', getPostController.getPost)
app.post('/comments/:id/delete', commentController.deleteComment)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login',loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));

