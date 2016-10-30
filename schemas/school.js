var mongoose = require('mongoose');

var schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    students: {
        type: Number,
        default: 0
    },

    location: {
        type: String,
        required: true,
        unique: true
    }

});


var School = mongoose.model('School', schoolSchema);

module.exports = School;
