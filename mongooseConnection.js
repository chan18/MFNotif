var mongoose = require('mongoose');

// import server config
var config = require('./config')

mongoose.connect(config.setup.Database.url,
                 {server : {poolSize : 4},
                  user : config.setup.Database.user,
                  pass : config.setup.Database.password,
                  socketTimeoutMS : 24*60*60*1000,
                  keepAlive : true});

var db = mongoose.connection;

// on case of any error,
db.on('error', console.error.bind(console, 'conn error:'));

// on database closing connection
db.on('close', function(err) {
  if (err)
      console.log(err);
  else
      console.log('[' + Date() + ']', 'Successfully closed');
});

// on database connected
db.once('open', function() {
  console.warn('[' + Date() + ']', 'Successfully connected to admin.');
});

// in case of any close signal to database process or tthe app.
function connectionClose() {
  mongoose.connection.close(function () {
      console.log('[' + Date() + ']', 'Mongoose default connection disconnected through app termination');
      process.exit(0);
  });
}

process.on('SIGINT', function() {
  connectionClose();
});

process.on('SIGTERM', function() {
  connectionClose();
});

module.exports = exports = mongoose;




