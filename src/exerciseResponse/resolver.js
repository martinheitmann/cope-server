//const MODEL_PATH = 'src/exerciseResponse/';
//const ExerciseResponse = require(MODEL_PATH + 'model');
const ExerciseResponse = require('../exerciseResponse/model');


function ResolveExerciseResponse(args){
    console.log('ResolveExerciseResponse invoked');
    if(args.id){
        console.log('resolver called on exerciseResponse for findExerciseResponseById');
        return ExerciseResponse.findExerciseResponseById(args.id);
    }
    else if(args.user){
        console.log('resolver called on exerciseResponse for findExerciseResponsesByUser');
        return ExerciseResponse.findExerciseResponsesByUser(args.user);
    }
    else {
        console.log('no matching resolver for argument passed to ResolveExerciseResponse');
    }
}

module.exports = ResolveExerciseResponse;