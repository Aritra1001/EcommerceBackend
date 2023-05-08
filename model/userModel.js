const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
            trim: true  // remove extra spaces 
        },
        email: {
            type: String,
            requied: true,
            // unique: true  // so that every user creates account using a unique wmail id
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        role:{
            type: Number,  // role will be 0 for users and 1 for admin
            default: 0
        }
},{timestamps: true}  // timestamps will add the created time when a new user is created
);

const UserModel = mongoose.model('users', userSchema);

module.exports = {UserModel};