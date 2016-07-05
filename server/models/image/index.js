var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var ImageSchema  = require('./schema')(Schema);

ImageSchema.virtual('webpath').get(function () {
  return process.env.IMAGES_URL + this.folder + '/' + this._id + '.' + this.mime;
});

Image = mongoose.model('Image', ImageSchema);

exports.imageModel = Image;