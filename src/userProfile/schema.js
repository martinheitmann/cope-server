const _ = require('lodash');
const graphql = require('graphql');
const exerciseResponses = require('../sample_data/exerciseResponses');
const ExerciseResponseType = require('../exerciseresponse/schema');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const UserProfileType = new GraphQLObjectType({
    name: 'UserProfile',
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
            type: new GraphQLList(ExerciseResponseType),
            resolve(parent, args){
                return _.filter(exerciseResponses, {exerciseId: parent.id})
            }
        }
    })
});

module.exports = UserProfileType;