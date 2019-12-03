const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    email: String,
    phone: String,
    address: String
});

module.exports = mongoose.model('UserProfile', userProfileSchema);