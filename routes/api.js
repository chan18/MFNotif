var express = require('express');
var mongoose = require('../mongooseConnection');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../config')
const mailer = require('@sendgrid/mail');

mailer.setApiKey(config.setup.SendGridKey);

// import express router middleware. and config
var router = express.Router();
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());

// ------------------- send mail -----------------
router.get('/testmail', function (req, res) {

  const msg = {
    to: 'ChandrakanthP@kavayahsolutions.com',
    from: config.setup.mailFrom,
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js TEST</strong>',
  };

  res.json(mail(msg).then((data) => {
    return data
  }));

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
    expiresIn: '30s'
  }, (err, token) => {
    res.json({
      token
    });
  });

});


// -------------------- orders --------------------
router.get('/orders', auth, (req, res) => {

  jwt.verify(req.token, 'secretkey', (error, data) => {
    if (error) {
      //console.log("error", error);
      res.sendStatus(403)
    } else {
      res.json({
        status: "ok",
        data
      });
    }
  });

});


// -------------------- inventory --------------------
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

// --------------------- send mail ---------------------------

function mail(msg) {
  return mailer.send(msg).then(() => {
    return {
      'msg': 'Email has been sent!'
    };
  }).catch((error) => {
    return {
      'msg': 'There was an error sending the email',
      'error': error
    };
  });
}

// ---------------------- send sms ---------------------------

// export the api-middleware
module.exports = router;