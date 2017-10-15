var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});