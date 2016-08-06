"use strict";
const User = require('../../model/user/modelManager');
const HTTP_STATUS_CODES = require('http-status-codes');
const _ = require("lodash");
const subdomainURL = require("../../util/subdomainURL");

module.exports = (req, callback) => {
    const userId = req.session.userId;
    const userQuery = {
            userId: userId
    };
    User(userQuery).getUserById((err, result) => {
        if(_.isEmpty(result)) {
            callback(HTTP_STATUS_CODES.UNAUTHORIZED, result);
        } else {
            result.redirect = subdomainURL(result.subdomain);
            callback(HTTP_STATUS_CODES.OK, result);
        }
    });
};
