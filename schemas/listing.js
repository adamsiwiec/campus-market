var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
    name: String,
    price: Number,
    school: String,
    email: String
})


var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
