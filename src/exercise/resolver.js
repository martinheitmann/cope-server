//const MODEL_PATH = 'src/exercise/';
//const Exercise = require(MODEL_PATH + 'model');
const Exercise = require('./model');

function ResolveExercise(args){
    if(args.identifier){
        console.log('exercise resolver: calling findExercisesByIdentifier');
        return Exercise.findExerciseByIdentifier(args.identifier);
    }
    else{
        console.log('no matching args, returning all exercises');
        return Exercise.findAllExercises();
    }
}

module.exports = ResolveExercise;
