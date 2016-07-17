module.exports = function getCollectionSchema(Schema) {

	var visibility = require('./visibility.json');

	return new Schema({
		createdAt: { type: Date },
		updatedAt: { type: Date },
	    title: {
	        type: String,
	        required: true,
	        validate: {
	            validator: function(v) {
	                return (v.length < 100);
	            },
	            message: '{VALUE} is not a title'
	        }
	    },
	    color: {
	        type: String ,
	        required: true,
	        validate: {
	            validator: function(v) {
	                return new RegExp('^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$').test(v);
	            },
	            message: '{VALUE} is not a valid color'
	        }
	    },
	    visibility: {
	    	type: String,
	    	default: visibility.PRIVATE.id
	    },
        itemsCount: {
            type: Number,
            default: 0
        },
	    _author : { type: String, ref: 'User' },
	    _thumbnail : { type: String, ref: 'Image' },
	});

}
