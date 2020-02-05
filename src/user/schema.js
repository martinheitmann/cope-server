const _ = require('lodash');
const graphql = require('graphql');
const EXERCISE_RESPONSE_PATH = '../exerciseResponse';
const ExerciseResponse = require( EXERCISE_RESPONSE_PATH + '/model');
const ExerciseResponseType = require('../exerciseResponse/schema');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID},
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        exerciseResponses: {
            type: ExerciseResponseType,
            resolve(parent, args){
                return ExerciseResponse.find({user: parent.id})
            }
        }
    })
});

module.exports = UserType;