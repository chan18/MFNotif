exports.setup = {
  // server configuration file.
  // for mail service.
  "SendGridKey": "",

  "mailFrom": "MFNotif@MF.com",
  "mailTo": "",

  // for sms service.
  "twilio": {
    "accountSid": "",
    "authToken": "",
    "from": "",
    "to": ""
  },

  // database
  "Database": {
    "url": "mongodb://127.0.0.1:27017",
    // local setup of mongo db that installed have no psw or user.
    // depending on deployment things need to be configured.
    "user": "",
    "password": ""
  },

}