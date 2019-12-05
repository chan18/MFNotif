exports.setup = {
  // server configuration file.
  // for mail service.
  "SendGridKey": "",

  "mailFrom": "MFNotif@MF.com",

  // for sms service.
  "twilioKey": "",

  // database
  "Database": {
    "url": "mongodb://127.0.0.1:27017",
    // local setup of mongo db that installed have no passowrd or user.
    // depending on deployment things need to be configured.
    "user": "",
    "password": ""
  }
}