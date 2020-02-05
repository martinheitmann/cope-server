const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    email: String,
    phone: String,
    address: String,
    exerciseResponses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ExerciseResponse'
        }
    ]
});

userSchema.statics.findUserById = function(id){
    return new Promise(async (resolve, reject) => {
        try {
            const user = User.findById(id);
            resolve(user);
        } catch(err){
            reject(err);
        }
    });
};

userSchema.statics.findUser = function(id){
    return new Promise(async (resolve, reject) => {
        try {
            const user = User.findById(id);
            resolve(user);
        } catch(err){
            reject(err);
        }
    });
};

userSchema.statics.findAllUsers = function(){
    return new Promise(async (resolve, reject) => {
        try {
            const users = User.find({});
            resolve(users);
        } catch(err){
            reject(err);
        }
    });
};

userSchema.statics.createUser = function(user){
    return new Promise(async (resolve, reject) => {
        try {
            user.save(function (err) {
                if (err) return console.error(err);
            });
            resolve(user);
        } catch(err){
            reject(err);
        }
    });
};

userSchema.statics.deleteUser = function(user){
    return new Promise(async (resolve, reject) => {
        try {
            user.deleteOne(function (err) {
                if (err) return console.error(err);
            });
            resolve(user);
        } catch(err){
            reject(err);
        }
    });
};


const User = mongoose.model('User', userSchema);
module.exports = User;