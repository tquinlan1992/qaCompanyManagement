const mongoose = require('mongoose');

module.exports = {
    ObjectId: mongoose.Schema.Types.ObjectId,
    defaultDateNow: {type: Date, default: Date.now()},
    requiredString: {type: String, required: true},
    requiredUniqueString: {type: String, required: true, index: { unique: true }},
    defaultTrue: {type: Boolean, default: true}
};
