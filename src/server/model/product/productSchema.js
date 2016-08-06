const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genericSchemas = require('../genericSchemas');

const product = new Schema({
    name: genericSchemas.requiredString,
    description: String,
    dateCreated: genericSchemas.defaultDateNow,
    lastUpdated: genericSchemas.defaultDateNow,
    imagePath: String,
    kind: {type: String},
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    stores: [ { type: Schema.Types.ObjectId, ref: 'Store' } ]
});

module.exports = mongoose.model('Product', product);
