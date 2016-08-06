"use strict";
const Company = require('../../model/company/modelManager');
const HTTP_STATUS_CODES = require('http-status-codes');
const _ = require("lodash");
const subdomainURL = require("../../util/subdomainURL");

module.exports = (req, callback) => {
    const selectProperties = req.body.selectProperties ? req.body.selectProperties : "";
    const companyId = req.session.companyId;
    const query = {
            query: {_id: companyId},
            selectProperties: selectProperties
    };
    Company(query).getCompany((err, result) => {
        if(_.isEmpty(result)) {
            callback(HTTP_STATUS_CODES.UNAUTHORIZED, result);
        } else {
            result.redirect = subdomainURL(result.subdomain);
            callback(HTTP_STATUS_CODES.OK, result);
        }
    });
};
