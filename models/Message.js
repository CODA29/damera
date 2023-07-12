const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    guest: String,
    email: String,
    description: String
   
});
const successMessage = 'successfully sent'

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message
