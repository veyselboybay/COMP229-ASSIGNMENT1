let mongoose = require('mongoose');

let contactModel = mongoose.Schema(
    {
        name:String,
        number: String,
        email:String
    },
    {
        collection:"contactList"
    }
);

module.exports = mongoose.model('Contact',contactModel);