
const User = require('../user/model');
const Exercise = require('../exercise/model');
const ExerciseResponse = require('../exerciseResponse/model');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function GenerateExerciseResponses(){
    console.log('generating exercise responses...');
    const exercise = await Exercise.findExerciseByIdentifier('STRESS_APPRAISAL');
    const allUsers = await User.find({});

    console.log("fetched exercise: " + exercise.name);
    console.log("fetched user count: " + allUsers.length);

    let localId = 0;
    for(let i = 0; i < allUsers.length; i++){
        for(let k = 0; k < 7; k++){
            const exerciseResponseQuestions = {
                questions: [
                    'Something happened today that made me feel _______ ',
                    'I experienced these feelings because _______',
                    'My perception of this event was _______',
                    'My thoughts were _______ /I said to myself _______'
                ],
                answers: [
                    makeid(24),
                    makeid(24),
                    makeid(24),
                    makeid(24),
                ]
            };

            const exerciseResponseData = {
                data: JSON.stringify(exerciseResponseQuestions)
            };
            const exerciseResponse = new ExerciseResponse({
                exerciseName: 'Stress Appraisal',
                identifier: 'STRESS_APPRAISAL',
                style: 'QUESTIONS_WITH_ANSWERS',
                data: JSON.stringify(exerciseResponseData),
                timestamp: new Date(),
                local_id: localId,
            });
            console.log('calling insert on exercise with local id ' + localId);
            await ExerciseResponse.insertExerciseResponse(exerciseResponse, allUsers[i]._id, exercise._id);
            localId++;
        }
    }
}

module.exports = GenerateExerciseResponses;