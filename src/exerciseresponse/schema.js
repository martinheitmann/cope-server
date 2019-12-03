const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = graphql;

const ExerciseResponseType = new GraphQLObjectType({
    name: 'ExerciseResponse',
    fields: () => ({
        id: { type: GraphQLID},
        userId: { type: GraphQLID},
        exerciseId: {type: GraphQLID},
        exerciseName: { type: GraphQLString},
        answers: { type: GraphQLString },
    })
});

module.exports = ExerciseResponseType;