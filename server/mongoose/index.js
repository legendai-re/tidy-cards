var mongoose = require('mongoose');
var uri = process.env.MONGODB_URI || "mongodb://localhost:2000/test";
mongoose.connect(uri);