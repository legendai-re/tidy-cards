module.exports = function getItemSchema(Schema) {

    var itemTypes = require('./itemTypes.json');
    var lifeStates = require('../lifeStates.json');

    return new Schema({
        createdAt: { type: Date },
        updatedAt: { type: Date },
        lifeState: {
            type: String,
            required: true,
            default: lifeStates.ACTIVE.id
        },
        title: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return (v.length < 500);
                },
                message: '{VALUE} is not a title'
            }
        },
        description: {
            type: String,
            required: false,
            validate: {
                validator: function(v) {
                    return (v.length < 10000);
                },
                message: '{VALUE} is not a description'
            }
        },
        false: {
            type: String,
            required: false,
            validate: {
                validator: function(v) {
                    return (v.length < 500);
                },
                message: '{VALUE} is not an host'
            }
        },
        type: {
            type: String,
            required: true,
            default: itemTypes.URL.id
        },
        _content: {
            type: Schema.Types.Mixed,
            required: false,
        },

        position: {type: Number},

        _collection: { type: String, ref: 'Collection' },
    });

}
