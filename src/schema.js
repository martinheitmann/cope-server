const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = require('graphql');
const UserType = require('./user/schema');
const ExerciseType = require('./exercise/schema');
const ExerciseResponseType = require('./exerciseResponse/schema');
const User = require('./user/model');
const Exercise = require('./exercise/model');
const ExerciseResponse = require('./exerciseResponse/model');
const ResolveExerciseResponse = require('./exerciseResponse/resolver');
const ResolveExercise = require('./exercise/resolver');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: { type: GraphQLString } },
            resolve(parent, args){
                return User.findUserById(args.id);
            }
        },
        exercise: {
            type: ExerciseType,
            args: {id: { type: GraphQLString } },
            resolve(parent, args){
                return Exercise.findExerciseById(args.id);
            }
        },
        exerciseResponse: {
            type: ExerciseResponseType,
            args: {
                id: { type: GraphQLID },
                user: {type: GraphQLID}
            },
            resolve(parent, args){
                console.log('resolver for root exerciseResponse called');
                return ResolveExerciseResponse(args);
            }
        },
        exerciseResponseList: {
            type: GraphQLList(ExerciseResponseType),
            args: {
                user: {type: GraphQLID},
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                console.log('resolver for root exerciseResponseList called');
                return ResolveExerciseResponse(args);
            }
        },
        exerciseList: {
            type: GraphQLList(ExerciseType),
            args: {identifier: {type: GraphQLString},},
            resolve(parent, args){
                console.log('resolver for root exerciseList called');
                return ResolveExercise(args);
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        createUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID},
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                gender: { type: GraphQLString },
                age: { type: GraphQLInt },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                address: { type: GraphQLString },
            },
            resolve(parent, args){
                let user = new User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    gender: args.gender,
                    age: args.age,
                    email: args.email,
                    phone: args.phone,
                    address: args.address,
                });
                return user.save();
            }
        },
        createExercise: {
            type: ExerciseType,
            args: {
                id: { type: GraphQLID },
                position: { type: GraphQLInt },
                moduleId: { type: GraphQLInt },
                identifier: { type: GraphQLString },
                name: { type: GraphQLString },
                style: { type: GraphQLString },
                data: { type: GraphQLString },
                isRepeatable: { type: GraphQLBoolean },
            },
            resolve(parent, args) {
                let exercise = new Exercise({
                    position: args.position,
                    module: args.module,
                    identifier: args.identifier,
                    name: args.name,
                    style: args.style,
                    data: args.data,
                    isRepeatable: args.isRepeatable
                });
                return exercise.save();
            }
        },
        createExerciseResponse: {
            type: ExerciseResponseType,
            args: {
                id: { type: GraphQLID },
                exerciseName: { type: GraphQLString },
                identifier: { type: GraphQLString },
                style: { type: GraphQLString },
                data: { type: GraphQLString },
                timestamp: { type: GraphQLString }
            },
            resolve(parent, args){
                let exerciseResponse = ExerciseResponse({
                    exerciseName: args.exerciseName,
                    identifier: args.identifier,
                    style: args.style,
                    data: args.data,
                    timestamp: args.timestamp,
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
