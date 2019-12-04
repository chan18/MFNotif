var express = require('express');
var mongoose = require('../mongooseConnection');
var bodyParser = require('body-parser');

// import express router. and config
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/order', (req,res) => {
  res.send("order")
});


router.get('/inventory', (req,res) => {

});