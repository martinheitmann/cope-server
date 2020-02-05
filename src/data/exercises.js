const EXERCISE_PATH = '../exercise';
const Exercise = require(EXERCISE_PATH + '/model');

function GenerateExercises(){
    let listOfExercises = [];

    let exerciseQuestions = {
        questions: [
            'Something happened today that made me feel _______ ',
            'I experienced these feelings because _______',
            'My perception of this event was _______',
            'My thoughts were _______ /I said to myself _______'
        ]
    };

    let exerciseData = {
        data: JSON.stringify(exerciseQuestions)
    };

    let exercise1 = new Exercise({
        position: 1,
        module: 0,
        identifier: 'STRESS_APPRAISAL',
        name: "Stress Appraisal",
        style: 'QUESTIONS_WITH_ANSWERS',
        //data: '{"data":"{\"questions\":[\"Something happened today that made me feel _______ \",\"I experienced these feelings because _______\",\"My perception of this event was _______\",\"My thoughts were _______ /I said to myself _______\"]"}',
        data: JSON.stringify(exerciseData),
        isRepeatable: true,
        responses: []
    });

    listOfExercises.push(exercise1);
    Exercise.insertMany(listOfExercises);
}

module.exports = GenerateExercises;