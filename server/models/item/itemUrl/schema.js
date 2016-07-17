module.exports = function getItemUrlSchema(Schema) {

    return new Schema({
        createdAt: { type: Date },
        updatedAt: { type: Date },
        url: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return (v.length < 1000);
                },
                message: '{VALUE} is not a title'
            }
        },
        imageUrl: {
            type: String,
            required: false
        }
    });

}
