const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genericSchemas = require('../genericSchemas');

const store = new Schema({
    name: genericSchemas.requiredString,
    description: String,
    dateCreated: genericSchemas.defaultDateNow,
    lastUpdated: genericSchemas.defaultDateNow,
    address: {
        street: String,
        city: String,
        state: String
    },
    imagePath: String,
    archive: {type: Boolean, default: false},
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Store', store);
