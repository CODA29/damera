const bcrypt = require('bcrypt')
const User = require('../models/User')
module.exports = (req, res) => {
    const { username, password } = req.body;


    User.findOne({username:username}, (error,user) =>{
        if(error){
            // Handle any errors that might occur during the database query
            return res.status(500).send('Internal Server Error');
        }
        if(!user){
            // If no user found, display an error message on the login page
            return res.render('login', {
                error: 'User not found.'
            })
        }
        
        bcrypt.compare(password, user.password, (error,same) =>{
            if(error){
                // Handle any errors that might occur during the password comparison
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            if(same){
                // If passwords match, set the session and redirect to create new post page 
                req.session.userId = user._id
                res.redirect('/blog')
            }else{
                // If passwords don't match, display an error message on the login page
                return res.render('login', { error: 'Invalid username or password.' });
            }
        })
        
    })
}