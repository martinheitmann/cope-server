
const GenerateExerciseResponses = require('./exerciseResponses');
const GenerateExercises = require('./exercises');
const GenerateUsers = require('./users');

async function Init() {
    //await GenerateExercises();
    //await GenerateUsers();
    await GenerateExerciseResponses();
}

module.exports = Init;