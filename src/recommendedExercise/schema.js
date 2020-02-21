const _ = require('lodash');
const graphql = require('graphql');
const UserType = require('../user/schema');
const User = require("mongoose");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList } = graphql;


const ExerciseType = new GraphQLObjectType({
    name: 'Exercise',
    fields: () => ({
        id: { type: GraphQLID },
        position: { type: GraphQLInt },
        module: { type: GraphQLInt },
        identifier: { type: GraphQLString },
        name: { type: GraphQLString },
        style: { type: GraphQLString },
        data: { type: GraphQLString },
        isRepeatable: { type: GraphQLBoolean },
    })
});

module.exports = ExerciseType;