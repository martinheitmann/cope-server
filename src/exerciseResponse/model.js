const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../user/model');
const Exercise = require('../exercise/model');

const exerciseResponseSchema = new Schema({
    exerciseName: String,
    identifier: String,
    style: String,
    data: String,
    timestamp: Date,
    local_id: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    },
});

exerciseResponseSchema.statics.findExerciseResponseById = function(id){
    return new Promise(async (resolve, reject) => {
        try {
            const response = ExerciseResponse.findById(id);
            resolve(response);
        } catch(err){
            reject(err);
        }
    });
};

exerciseResponseSchema.statics.findExerciseResponsesByUser = function(_user){
    return new Promise(async (resolve, reject) => {
        try {
            const responses = ExerciseResponse.find({ user: _user});
            resolve(responses);
        } catch(err){
            reject(err);
        }
    })
};

exerciseResponseSchema.statics.insertExerciseResponse = async function(response, userId, exerciseId){
    console.log("inserting exerciseResponse with userId " + userId + " and exerciseId " + exerciseId);
    if(response == null) throw('Can\'t insert an empty exercise response');
    if(userId == null || exerciseId == null) throw('Can\'t insert an exercise response without a user or exercise ref');
    try {
        let r = response;
        r.exercise = exerciseId;
        r.user = userId;
        r.save();
        console.log('saving exercise response with id ' + r._id);
        const user = await User.findById(userId);
        const exercise = await Exercise.findById(exerciseId);

        user.exerciseResponses.push(r._id);
        exercise.responses.push(r._id);
        user.save();
        exercise.save();
    } catch (err){
        console.log(err);
    }
};

const ExerciseResponse = mongoose.model('ExerciseResponse', exerciseResponseSchema);
module.exports = ExerciseResponse;