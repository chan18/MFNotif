var express = require('express');
var mongoose = require('../mongooseConnection');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

// import express router middleware. and config
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// ---------------- get token --------------
router.get('/get_token',(req,res) => {

// Mock user
const user = {
  id: 1,
  username: 'MK',
  email: 'MK@gmail.com'
}

jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
  res.json({
    token
  });
});

})


// -------------------- orders --------------------
router.get('/orders', auth ,(req,res) => {

  jwt.verify(req.token,'secretkey', (error, data) => {
    if (error) {
      console.log("error",error);
       //res.sendStatus(403)
    } else {
      res.json({
        status: "ok",
        data
      });
    }
  });

});


// -------------------- inventory --------------------
router.get('/inventory', (req,res) => {
  res.send("inventory");
});

// auth middlie ware
function auth(req,res,next) {
   // get auth header value
   const bearerHeader = req.headers['auth'];

  // incase of any of the api req don't have a token.
  if (typeof bearerHeader !== 'undefined') {
    req.token  = bearerHeader.split(" ")[1];
    next();
  } else {
    // forbidden access, with out token
    res.sendStatus(401);
  }

}

// export the api-middleware
module.exports = router;