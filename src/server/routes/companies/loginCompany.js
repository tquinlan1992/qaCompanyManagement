"use strict";
const Company = require('../../model/company/modelManager');
const User = require('../../model/user/modelManager');
const HTTP_STATUS_CODES = require('http-status-codes');
const subdomainURL = require("../../util/subdomainURL");
const _ = require("lodash");

module.exports = (req, callback) => {
    const email = req.body.email;
    const password = req.body.password;
    const subdomain = req.subdomain ? req.subdomain : req.body.subdomain;
    const companyQuery = {
        subdomain: subdomain
    };
    Company(companyQuery).getCompany((err, company) => {
        if (!company) {
            callback(HTTP_STATUS_CODES.UNAUTHORIZED);
            return;
        }
        const userQuery = {
                email: email,
                password: password,
                companyId: company._id
        };
        User(userQuery).verifyUser((err, user) => {
            if (err) {
                callback(HTTP_STATUS_CODES.BAD_REQUEST);
            } else {
                if (!user) {
                    callback(HTTP_STATUS_CODES.UNAUTHORIZED);
                } else {
                    _.assign(req.session, {
                        companyId: company._id,
                        userId: user._id,
                        subdomain: company.subdomain
                    });
                    callback(HTTP_STATUS_CODES.OK, {redirect: subdomainURL(company.subdomain), subdomain: company.subdomain});
                }
            }
        });
    });
};
