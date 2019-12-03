var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const Server = require('./lib/server');
const Schema = require('./schema');

let server = new Server()
    .initializeDatabaseConnection()
    .setupGraphQL(Schema)
    .listen();

console.log('Running a GraphQL API server at localhost:4000/graphql');