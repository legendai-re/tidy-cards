var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ImageSchema  = require('./schema')(Schema);

ImageSchema.pre('save', function(next) {
    if(!this.createdAt)
        this.createdAt = new Date();
    this.updatedAt = Date();
    next();
});

ImageSchema.virtual('baseUrl').get(function () {
   return process.env.IMAGES_URL + process.env.IMAGES_FOLDER;
});

Image = mongoose.model('Image', ImageSchema);

exports.imageModel = Image;
