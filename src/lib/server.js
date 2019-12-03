const express = require('express');
const mongoose = require('mongoose');
var graphqlHTTP = require('express-graphql');

class Server {
    constructor(){
        this.app = express();
        return this;
    }

    initializeDatabaseConnection(){
        mongoose.connect('mongodb://localhost:27017/cope-server', { useNewUrlParser: true });
        mongoose.connection.once('open', () => {
            console.log('Connected to database!');
        });
        return this;
    }

    setupGraphQL(schema){
        this.app.use('/graphql', graphqlHTTP({
            schema: schema,
            graphiql: true,
        }));
        return this;
    }

    listen(){
        this.app.listen(4000);
    }
}

module.exports = Server;
