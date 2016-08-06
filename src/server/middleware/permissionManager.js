"use strict";

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = (req, res, next) => {
    const subdomain = req.subdomain;
    if (req.session.companyId && req.session.subdomain === subdomain) {
        next();
    } else {
        res.status(HTTP_STATUS_CODES.UNAUTHORIZED);
        res.end();
    }
};
