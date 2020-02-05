const USER_PATH = '../user';
const EXERCISE_RESPONSE_PATH = '../exerciseResponse';
const User = require(USER_PATH + '/model');
const ExerciseResponse = require(EXERCISE_RESPONSE_PATH + '/model');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateEmail(){
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var string = '';
    for(var ii=0; ii<15; ii++){
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string + '@domain.com';
}

function generateRandomGender(){
    let x = Math.round(Math.random());
    if(x === 0) return 'Male';
    else return 'Female';
}

function GenerateUsers() {
    let listOfUsers = [];

    for (let a = 0; a < 100; a++) {
        let user = new User({
            firstName: makeid(12),
            lastName: makeid(12),
            gender: generateRandomGender(),
            age: randomIntFromInterval(18, 66),
            email: generateEmail(),
            phone: Math.floor(Math.random() * 1000000000),
            address: makeid(16),
            exerciseResponses: []
        });
        listOfUsers.push(user);
    }
    User.insertMany(listOfUsers);
}

module.exports = GenerateUsers;

