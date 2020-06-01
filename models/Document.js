const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        maxlength: [350, 'Title can not be more than 350 characters']
    },

    body: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Document', DocumentSchema);