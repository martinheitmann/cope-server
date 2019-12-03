const graphql = require('graphql');
const ExerciseResponseType = require('../exerciseresponse/schema');
const _ = require('lodash');
const exerciseResponses = require('../sample_data/exerciseResponses');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = graphql;

const ExerciseType = new GraphQLObjectType({
   name: 'Exercise',
   fields: () => ({
       id: { type: GraphQLID},
       name: { type: GraphQLString},
       category: { type: GraphQLString },
       topic: {type: GraphQLString},
       exerciseResponse: {
           type: ExerciseResponseType,
           resolve(parent, args){
               console.log(exerciseResponses);
               return _.find(exerciseResponses, { id: parent.id})
           }
       }
   })
});

module.exports = ExerciseType;