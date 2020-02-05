const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    position: Number,
    module: Number,
    identifier: String,
    name: String,
    style: String,
    data: String,
    isRepeatable: Boolean,
    responses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ExerciseResponse'
        }
    ]
});

exerciseSchema.statics.findExerciseById = function(id){
    return new Promise(async (resolve, reject) => {
        try {
            const exercise = Exercise.findById(id);
            resolve(exercise);
        } catch(err){
            reject(err);
        }
    });
};

exerciseSchema.statics.findAllExercises = function(){
    return new Promise(async (resolve, reject) => {
        try {
            console.log('exercise model: calling findAllExercises');
            const exercises = Exercise.find({});
            resolve(exercises);
        } catch(err){
            reject(err);
        }
    });
};

exerciseSchema.statics.findExerciseByIdentifier = function(identifier){
    return new Promise(async (resolve, reject) => {
        try {
            console.log('exercise model: calling findExercisesByIdentifier');
            const exercise = await Exercise.findOne({identifier: identifier});
            console.log('exercise with id ' + exercise._id + " and identifier "+ exercise.identifier + " found");
            resolve(exercise);
        } catch(err){
            reject(err);
        }
    });
};

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;