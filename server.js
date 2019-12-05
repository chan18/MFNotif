// import express
var express = require('express');
var bodyParser = require('body-parser');

// import mongoose connector
var mongoose = require('./mongooseConnection');

// instance of express js
var app = express();

// import routes
var apiRoutes = require('./routes/api');

// import server config
var config = require('./config');

// for debugging
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, '\nreason:', reason);
});

// setup the port.
var port = 5000;

// configure express app.
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRoutes);

//  on " / " send index, config index page
app.get('/', (req, res) => {
    res.send("index page");
});

// boot the app
app.listen(port);