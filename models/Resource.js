const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title for your resource'],
        maxlength: [350, 'Title can not be more than 350 characters']
    },

    type: {
        type: String,
        required: [true, 'Resource must contain a type attribute']
    },

    body: {},

    createdAt: {
        type: Date,
        default: Date.now
    },

    documentId: {
        type: String,
        required: [true, 'Resource must belong to a document']
    }

})

module.exports = mongoose.model('Resource', ResourceSchema);