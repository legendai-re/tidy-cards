module.exports = function getItemSchema(Schema) {

    var itemTypes = require('./itemTypes.json');

    return new Schema({
        createdAt: { type: Date },
        updatedAt: { type: Date },
        description: {
            type: String,
            required: false,
            validate: {
                validator: function(v) {
                    return (v.length < 1024);
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
            type: Schema.Types.Mixed,
            required: false,
        },
        _collection: { type: String, ref: 'Collection' },
    });

}
