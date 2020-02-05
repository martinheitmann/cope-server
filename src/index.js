const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Server = require('./lib/server');
const Schema = require('./schema');
const Init = require('./data/init');

let server = new Server()
    .initializeDatabaseConnection()
    .setupGraphQL(Schema)
    .listen();

Init();
console.log('Running a GraphQL API server at localhost:4000/graphql');