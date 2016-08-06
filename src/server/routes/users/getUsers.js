"use strict";
const HTTP_STATUS_CODES = require('http-status-codes');
const User = require("../../model/user/modelManager");


module.exports = (req, callback) => {
    const userQuery = {
        companyId: req.session.companyId
    };
    User(userQuery).getUsersByCompanyId((err, result) => {
        callback(HTTP_STATUS_CODES.OK, result);
    });
};
