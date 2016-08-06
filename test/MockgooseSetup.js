var mockgoose = require("mockgoose");
var mongoose = require("mongoose");

mockgoose(mongoose);

mongoose.connect("mongodb://localhost/testing");

module.exports = mockgoose;
