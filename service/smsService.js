// import server config
var config = require('../config');

// ---------------------- send sms ---------------------------
function sms(msg) {
    const twilioClient = require('twilio')(config.setup.twilio.accountSid, config.setup.twilio.authToken);

    return twilioClient.messages.create(msg).then((message) => {
        return {
            "msg": "sms sent",
            message
        };
    }).catch((error) => {
        return {
            'msg': 'There was an error sending sms',
            'error': error
        }
    });

}

module.exports = sms;