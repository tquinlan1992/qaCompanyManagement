"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genericSchemas = require('../genericSchemas');

let company = new Schema({
    subdomain: genericSchemas.requiredUniqueString
});

module.exports = mongoose.model('Company', company);
