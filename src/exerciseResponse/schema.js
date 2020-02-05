const _ = require('lodash');
const graphql = require('graphql');
const UserType = require('../user/schema');
const User = require("mongoose");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList } = graphql;


const ExerciseResponseType = new GraphQLObjectType({
    name: 'ExerciseResponse',
    fields: () => ({
        id: { type: GraphQLID },
        exerciseName: { type: GraphQLString },
        identifier: { type: GraphQLString },
        style: { type: GraphQLString },
        data: { type: GraphQLString },
        timestamp: { type: GraphQLString },
        local_id: {type: GraphQLInt},
        user: { type: GraphQLID },
        exercise: { type: GraphQLID }
    })
});

module.exports = ExerciseResponseType;