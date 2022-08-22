const Message = require('../models/Message')
const path = require('path')
module.exports = (req,res) =>{
    Message.create(req.body, (error, message) =>{
        res.redirect('/')
    })
}