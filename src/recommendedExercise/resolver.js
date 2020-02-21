//const MODEL_PATH = 'src/exercise/';
//const Exercise = require(MODEL_PATH + 'model');
const Exercise = require('../exercise/model');
const User = require('../user/model');
const ExerciseResponse = require('../exerciseResponse/model');
const ResolveUser = require('../user/resolver');

async function ResolveRecommendedExercise(userId) {
    /*
    if(args.identifier){
        console.log('exercise resolver: calling findExercisesByIdentifier');
        return Exercise.findExerciseByIdentifier(args.identifier);
    }
    else{
        console.log('no matching args, returning all exercises');
        return Exercise.findAllExercises();
    }
    */
/*
    // Get one user, get one exerciseResponse and get one exercise
    const userPromise = await User.findUserById(args);

    userPromise.then(function(val) {
         console.log("val: " + val);
         var user = val;
         var exerciseResponseId = user.exerciseResponses[0];
         console.log("exerciseResponseId: " + exerciseResponseId);
         const exerciseResponsePromise = ExerciseResponse.findExerciseResponseById(exerciseResponseId);
         console.log("exerciseResponsePromise: " + exerciseResponsePromise);
         exerciseResponsePromise.then(function(val2) {
            console.log("val2: " + val2);
            var exerciseReponse = val2;
            var exerciseId = exerciseReponse.exercise;
            const exercisePromise = Exercise.findExerciseById(exerciseId);
            exercisePromise.then(function(val3) {
                var exercise = val3;
                console.log("exercise: " + exercise);

                console.log("return exercissePromise; " + exercisePromise);
                return exercisePromise;
            });
         });
    });

    console.log("nederst i funksjonen");
    */
    /*const exercise = await Exercise.findExerciseById(args);
    console.log(exercise.id);
    return exercise;
    */

    /*
    const user = await User.findUserById(args);
    console.log(user.exerciseResponses);
    var responses = user.exerciseResponses;
    var exerciseResponseId = responses[0];
    console.log("User has exerciseResponseId: " + exerciseResponseId);

    const exerciseResponses2 = await ExerciseResponse.findExerciseResponsesByUser(user);
    console.log(exerciseResponses2);
    const exerciseResponse = await ExerciseResponse.findExerciseResponseById(exerciseResponseId);
    var exerciseId = exerciseResponse.exercise;
    console.log("ExerciseResponse has exercise: " + exerciseId);

    const exercise = await Exercise.findExerciseById(exerciseId);
    var exerciseName = exercise.name;
    console.log("Exercise has name: " + exerciseName);

    */

    return await recommend(userId);
}

/**
 * Method for recommending an exercise
 * @param userId
 * @returns {*}
 */
async function recommend(userId) {

    const user = await User.findUserById(userId);
    const usersResponses = await ExerciseResponse.findExerciseResponsesByUser(user);
    let usersExercises = await populateExercises(usersResponses);
    let allExercises = await Exercise.findAllExercises();

    let possibleRecommendedExercises = filterCompletedExercises(usersExercises, allExercises);

    console.log("allExercises: " + allExercises.length);
    console.log("usersExercises: " + usersExercises.length);
    console.log("notCompletedExercises: " + possibleRecommendedExercises.length);

    return possibleRecommendedExercises[0];
}

/**
 * Checks whether the user has done the exercise before
 * (or has a response for that exercise)
 * @param usersExercises
 * @param allExercises
 * @returns {Array}
 */
function filterCompletedExercises(usersExercises, allExercises) {
    let exercisesNotCompleted = [];
    allExercises.forEach(e => {
        if (!usersExercises.some(ue => ue.id === e.id)) {
            exercisesNotCompleted.push(e);
        }
    });
    return exercisesNotCompleted;
}

/**
 * Populating exercises using IDs from each ExerciseResponse.exercise
 * @param responses
 * @returns {Promise<Array>}
 */
async function populateExercises(responses) {
    let exercises = [];
    for (let i = 0; i < responses.length; i++) {
        let exercise = await Exercise.findExerciseById(responses[0].exercise);
        exercises.push(exercise);
    }

    return exercises;
}

module.exports = ResolveRecommendedExercise;
