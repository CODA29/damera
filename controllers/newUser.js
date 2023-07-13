const User = require("../models/User")
const storeUser = require("./storeUser")


module.exports = (req, res) =>{
    var username = ""
    var password = ""
    var name=""
   
   // var success = "You have successfully registered"
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
        username = data.username
        password = toString((data.password));
        name =  data.name
      
        
       
    }

    res.render('register', {
        //errors: req.session.validationErrors
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
        name : name,
        
       
        
    })
    
}