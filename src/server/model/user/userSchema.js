const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genericSchemas = require('../genericSchemas');

const user = new Schema({
    firstName: genericSchemas.requiredString,
    lastName: String,
    email: genericSchemas.requiredUniqueString,
    password: {type: String, required: true, default: "password"},
    permission: {type: String, default: "write"},
    companyId: { type: Schema.Types.ObjectId, required: true, ref: 'Company' }
});

module.exports = mongoose.model('User', user);
