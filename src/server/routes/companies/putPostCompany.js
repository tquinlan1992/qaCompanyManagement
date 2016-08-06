"use strict";
const Company = require('../../model/company/modelManager');
const User = require('../../model/user/modelManager');
const HTTP_STATUS_CODES = require('http-status-codes');
const subdomainURL = require("../../util/subdomainURL");
const _ = require("lodash");

module.exports = putPost => {
    return (req, done) => {
        const putPostIsPost = (putPost === "post");
        const companyId = req.session.companyId;
        let method = "putCompany";
        if (putPostIsPost) {
            method = "postCompany";
        }
        const companyQuery = {
            companyId: companyId
        };
        const companyData = {
            newCompany: req.body
        };
        Company(companyQuery, companyData)[method]((err, company) => {
            if (err) {
                done(HTTP_STATUS_CODES.BAD_REQUEST);
                return;
            }
            _.assign(req.body, {companyId: company._id});
            if (!putPostIsPost) {
                const userData = {
                    newUser: req.body
                };
                User(null, userData).putUser((err, user) => {
                    if (err) {
                        done(HTTP_STATUS_CODES.BAD_REQUEST);
                    } else {
                        let response = {redirect: subdomainURL(company.subdomain), subdomain: company.subdomain};
                        req.session.subdomain = company.subdomain;
                        req.session.companyId = company._id;
                        if (!putPostIsPost) {
                            req.session.userId = user._id;
                        }
                        done(HTTP_STATUS_CODES.OK, response);
                    }
                });
            } else {
                let response = {redirect: subdomainURL(company.subdomain), subdomain: company.subdomain};
                req.session.subdomain = company.subdomain;
                done(HTTP_STATUS_CODES.OK, response);
            }
        });
    };
};
