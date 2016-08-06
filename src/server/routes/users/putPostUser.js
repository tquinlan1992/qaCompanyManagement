"use strict";
const User = require('../../model/user/modelManager');
const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = (req, done) => {
        const userId = req.params.userId;
        const companyId = req.session.companyId;
        let method = "putUser";
        if (userId) {
            method = "postUser";
        }
        req.body.companyId = companyId;
        const userQuery = {
            companyId: companyId
        };
        const userData = {
            newUser: req.body
        };
        User(userQuery, userData)[method]((err, result) => {
            if (err) {
                done(HTTP_STATUS_CODES.BAD_REQUEST);
            } else {
                done(HTTP_STATUS_CODES.OK, result);
            }
        });
};
