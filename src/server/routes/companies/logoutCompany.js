"use strict";
const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = (req, callback) => {
    req.session.companyId = undefined;
    req.session.subdomain = undefined;
    callback(HTTP_STATUS_CODES.OK, {});
};
