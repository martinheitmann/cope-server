const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Server = require('./lib/server');
const Schema = require('./schema');
const Init = require('./data/init');
const Query = require('./gqlClient/query/createQuestionnaire');

let server = new Server()
    .initializeDatabaseConnection()
    .setupGraphQL(Schema)
    .listen();

//Init();
//Query();
console.log('Running a GraphQL API server at localhost:4000/graphql');