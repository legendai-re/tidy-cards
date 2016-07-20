var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var StarSchema = require('./schema')(Schema);

StarSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
});

StarSchema.pre('update', function(next) {
    this.updatedAt = Date();
});

Star = mongoose.model('Star', StarSchema);

exports.starModel = Star;
