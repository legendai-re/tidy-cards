var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ImageSchema  = require('./schema')(Schema);

ImageSchema.virtual('baseUrl').get(function () {
   return process.env.IMAGES_URL + process.env.IMAGES_FOLDER;
});

Image = mongoose.model('Image', ImageSchema);

exports.imageModel = Image;
