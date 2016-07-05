module.exports = function getUserSchema(Schema) {

	return new Schema({
		createdAt: { type: Date },
		updatedAt: { type: Date },
	    username: {
	        type: String,
	        required: true,
	        validate: {
	            validator: function(v) {
	                return (v.length > 1 && v.length < 30);
	            },
	            message: '{VALUE} is not a valid username'
	        }
	    },
	    password: {
	        type: String ,
	        required: true,
	        select: false,
	        validate: {
	            validator: function(v) {
	                return (v.length > 1);
	            },
	            message: '{VALUE} is not a valid password'
	        }      
	    },
	    email: {
	        type: String,
	        required: true
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
	    collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }]
	});	
    
}