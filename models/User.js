const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
    
    username: {
        type: String,
        required: [true, 'Provide username'],
        unique: [true],
    },
    password: {
        type: String,
        required: [true, 'Provide password']
    },
    resetPasswordToken:{
        type :String
    },
    resetPasswordTokenExpiry:{
        type:Date
    }
});
UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) =>{
        user.password = hash
        next()
    })
})
const User = mongoose.model('User', UserSchema);
module.exports = User