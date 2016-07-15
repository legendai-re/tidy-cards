module.exports = function getItemSchema(Schema) {

    var itemTypes = require('./itemTypes.json');

    return new Schema({
        createdAt: { type: Date },
        updatedAt: { type: Date },
        title: {
            type: String,
            required: true,
            default: 'My new item',
            validate: {
                validator: function(v) {
                    return (v.length < 100);
                },
                message: '{VALUE} is not a title'
            }
        },
        description: {
            type: String,
            required: false,
            validate: {
                validator: function(v) {
                    return (v.length < 100);
                },
                message: '{VALUE} is not a title'
            }
        },
        type: {
            type: Number,
            required: true,
            default: itemTypes.URL
        },
        _content: {
            type: String,
            required: false,
        },
        _collection: { type: String, ref: 'Collection' },
    });

}
