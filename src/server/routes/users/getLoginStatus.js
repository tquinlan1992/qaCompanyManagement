"use strict";
const HTTP_STATUS_CODES = require('http-status-codes');
const subdomainURL = require("../../util/subdomainURL");

module.exports = (req, callback) => {
    callback(HTTP_STATUS_CODES.OK, {subdomain: req.session.subdomain, redirect: subdomainURL(req.session.subdomain)});
};
