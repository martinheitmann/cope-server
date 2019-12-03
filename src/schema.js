const _ = require('lodash');
const graphql = require('graphql');
const Exercise = require('./exercise/model');
const ExerciseType = require('./exercise/schema');
const UserProfile = require('./userProfile/model');
const exercises = require('./sample_data/exercises');
const UserProfileType = require('./userProfile/schema');
const userprofiles = require('./sample_data/userProfiles');
const ExerciseResponse = require('./exerciseresponse/model');
const ExerciseResponseType = require('./exerciseresponse/schema');
const exerciseresponses = require('./sample_data/exerciseResponses');
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        exercise: {
            type: ExerciseType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return _.find(exercises, {id: args.id});
            }
        },
        exercises: {
            type: new GraphQLList(ExerciseType),
            resolve(parent, args){
                //return exercises;
            }
        },
        exerciseResponse: {
            type: ExerciseResponseType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return _.find(exerciseresponses, {id: args.id});
            }
        },
        exerciseResponses: {
            type: new GraphQLList(ExerciseResponseType),
            resolve(parent, args){
                //return exerciseresponses
            }
        },
        userProfile: {
            type: UserProfileType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(userprofiles, {id: args.id});
                return UserProfile.findById(args.id);
            }
        },
        userProfiles: {
            type: UserProfileType,
            resolve(parent, args){
                // return userprofiles
            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUserProfile: {
            type: UserProfileType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                gender: { type: GraphQLString },
                age: { type: GraphQLInt },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                address: { type: GraphQLString },
            },
            resolve(parent, args){
                let userProfile = new UserProfile({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    gender: args.gender,
                    age: args.age,
                    email: args.email,
                    phone: args.phone,
                    address: args.address
                });
                return userProfile.save();
            }
        },
        addExercise: {
            type: ExerciseType,
            args: {
                name: { type: GraphQLString},
                category: { type: GraphQLString },
                topic: {type: GraphQLString},
            },
            resolve(parent, args){
                let exercise = new Exercise({
                    name: args.name,
                    category: args.category,
                    topic: args.topic
                });
                return exercise.save();
            }
        },
        addExerciseResponse: {
            type: ExerciseResponseType,
            args: {
                exerciseId: {type: GraphQLID},
                exerciseName: { type: GraphQLString},
                answers: { type: GraphQLString },
            },
            resolve(parent, args){
                let exerciseResponse = new ExerciseResponse({
                    exerciseId: args.exerciseId,
                    exerciseName: args.exerciseName,
                    answers: args.answers,
                });
                return exerciseResponse.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});