var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var smsService = require('../service/smsService');
var mailService = require('../service/mailService');
var config = require('../config');

var router = express.Router({
    mergeParams: true
});
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/order', (req, res) => {

    var mailMsg = {
        to: config.setup.mailTo,
        from: config.setup.mailFrom,
        subject: 'MFNotify Order details',
    };

    // based on seller id(params), will get to mail.from database.
    var smsMsg = {
        from: config.setup.twilio.from,
        to: config.setup.twilio.to,
    };

    var message = null;
    // check event query
    if (req.query.hasOwnProperty("event")) {
        message = buildMessage(req, res, mailMsg, smsMsg)
    } else {
        res.json({
            "msg": "send event query"
        });
    }

    if (message != null) {
        //send mail and sms
        mailService(message.mail).then((mail) => {
            smsService(message.sms).then((sms) => {
                res.json({
                    mail,
                    sms
                });
            });
        });
        return;
    }

    // to stop req-res loop in any edge case.
    res.json({
        "msg": "please check your api"
    });
});


function buildMessage(req, res, mailData, smsData) {

    // based on productId(params) will get product details, and it's failures from database.
    // e-mail
    if (req.query.event.toUpperCase() === "SERVED") {
        mailData["text"] = "order has been served";
        mailData["html"] = "order has been <b>served</b>";
        // sms
        smsData["body"] = "Order has been served";

        return {
            mail: mailData,
            sms: smsData
        };
    }

    if (req.query.event.toUpperCase() === "CANCELLED") {

        mailData["text"] = "order has been cancelled ";
        mailData["html"] = "order has been <b>cancelled </b>";
        // sms
        smsData["body"] = "Order has been cancelled ";

        return {
            mail: mailData,
            sms: smsData
        };

    }

    if (req.query.event.toUpperCase() === "DELIVERED") {

        mailData["text"] = "order has been delivered ";
        mailData["html"] = "order has been <b>delivered </b>";
        // sms
        smsData["body"] = "Order has been delivered ";

        return {
            mail: mailData,
            sms: smsData
        };

    }

    // in case of any other event, edge case
    return null;
}

// export the orders-api-middleware
module.exports = router;