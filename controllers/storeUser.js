const User = require('../models/User.js')


module.exports = (req,res) => {
    User.create(req.body, (error, user) =>{
        if(error){

            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            //req.session.validationErrors = validationErrors
            req.flash('data', req.body)
            return res.redirect('/auth/register')
        }else{

            
            //res.redirect(`/success?message=${encodeURIComponent(successMessage)}`);
            res.redirect('/success')
           
        }
           
           
        
        
    })
    
    
}