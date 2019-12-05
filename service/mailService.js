// import server config
var config = require('../config');

const mailer = require('@sendgrid/mail');
mailer.setApiKey(config.setup.SendGridKey);

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

module.exports = mail;