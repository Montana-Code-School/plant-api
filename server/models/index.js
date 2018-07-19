const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect();
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./plant');
};
