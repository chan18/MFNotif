var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../config');
var mongoose = require('../mongooseConnection');
var smsService = require('../service/smsService');
var mailService = require('../service/mailService');
var ordersRoutes = require('./ordersApi');

// import express router middleware. and config
var router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}));

// seller/:sellerId/products/:productId/order?event="eventType"
router.use('/seller/:sellerId/products/:productId/orders', [auth,
  verifyToken
], ordersRoutes);

router.use(bodyParser.json());

// ------------------- test send mail -----------------
router.get('/testmail', function (req, res) {

  const msg = {
    to: config.setup.mailTo,
    from: config.setup.mailFrom,
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js TEST</strong>',
  };

  mailService(msg).then((data) => {
    res.json(data);
  });

});

// ------------------- test send sms -----------------
router.get('/testsms', function (req, res) {
  msg = {
    from: config.setup.twilio.from,
    to: config.setup.twilio.to,
    body: "You just sent an SMS from Node.js using Twilio!"
  };

  smsService(msg).then((data) => {
    res.json(data);
  });
});

// ---------------- get token --------------
router.get('/get_token', (req, res) => {

  // Mock user
  const user = {
    id: 1,
    username: 'MK',
    email: 'MK@gmail.com'
  };

  jwt.sign({
    user
  }, 'secretkey', {
    expiresIn: '60s'
  }, (err, token) => {
    res.json({
      token
    });
  });

});

// -------------------- test orders --------------------
router.use('/orders', auth, (req, res) => {

  jwt.verify(req.token, 'secretkey', (error, data) => {
    if (error) {
      console.log("error", error);
      res.status(403).json({
        "message": error.message,
        "name": error.name
      });
    } else {
      res.json({
        status: "ok",
        data
      });
    }
  });

});

// -------------------- test inventory --------------------
router.get('/inventory', (req, res) => {
  res.send("inventory");
});

// ---------------------- auth middleware ---------------------
function auth(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers['auth'];

  // incase of any of the api req don't have a token.
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader.split(" ")[1];
    next();
  } else {
    // forbidden access, with out token
    res.sendStatus(401);
  }

}

function verifyToken(req, res, next) {
  jwt.verify(req.token, 'secretkey', (error, data) => {
    if (error) {
      console.log("error", error);
      res.status(403).json({
        "message": error.message,
        "name": error.name
      });
    } else {
      next();
    }
  });
}

// export the api-middleware
module.exports = router;