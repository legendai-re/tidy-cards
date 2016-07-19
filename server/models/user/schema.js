module.exports = function getUserSchema(Schema) {

    var lifeStates = require('../lifeStates.json');

	return new Schema({
		createdAt: { type: Date },
		updatedAt: { type: Date },
        lifeState: {
            type: String,
            required: true,
            default: lifeStates.ACTIVE.id
        },
        local: {
            password: {
                type: String,
                select: false
            }
        },
        facebook: {
            id: String,
            token: {
                type: String,
                select: false
            }
        },
        twitter: {
            id: String,
            token: {
                type: String,
                select: false
            }
        },
        google: {
            id: String,
            token: {
                type: String,
                select: false
            }
        },
        connectionTypes: {
            type: [String]
        },
        unsafeUsername: {
            type: String,
            required: true
        },
        facebookId: {
            type: String,
            required: false,
            select: false
        },
        twitterId: {
            type: String,
            required: false,
            select: false
        },
	    email: {
	        type: String,
	        required: false
	    },
	    roles: {
	        type: Array
	    },
	    name: {
	        type: String,
	        required: true,
	        validate: {
	            validator: function(v) {
	                return (v.length > 1 && v.length < 30);
	            },
	            message: '{VALUE} is not a valid name'
	        }
	    },
	    bio: {
	        type: String,
	        required: false,
	        validate: {
	            validator: function(v) {
	                return (v.length < 1000);
	            },
	            message: 'Bio is to long'
	        }
	    },
	    _starredCollections: {
	    	select: false,
	    	type: Array //Relation to Collection
	    },
        _avatar: { type: String, ref: 'Image' }
	});

}
