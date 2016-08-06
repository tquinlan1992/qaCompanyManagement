"use strict";
var mockgoose = require("../../MockgooseSetup");
const putPostUser = require("../../../src/server/routes/users/putPostUser");
const createCompany = require("../createCompany");
const test = require("tape");
const _ = require("lodash");
const HTTP_STATUS_CODES = require('http-status-codes');


mockgoose.reset();
const userMongoose = require("../../../src/server/model/user/userSchema");

test("test put user", t => {
    mockgoose.reset();
    createCompany.tenUsers( (err, createdCompanies) => {
        let req = {
            body: {
                firstName: "Tom",
                lastName: "Quinlan",
                email: "tom@aol.com",
                password: "tomPassword"
            },
            params: {},
            session: {
                companyId: createdCompanies[0]._id
            }
        };
        t.plan(3);
        putPostUser(req, (status, newUser) => {
            t.equal(status, HTTP_STATUS_CODES.OK, "status should be ok");
            t.deepEqual(_.pick(newUser, _.keys(req.body)), req.body);
            userMongoose.findOne({_id: newUser._id}, (err, result) => {
                result = _.pick(result.toJSON(), _.keys(req.body));
                t.deepEqual(result, req.body, "result should be equal to response");
            });
        });
    });
});

test("test put duplicate email", t => {
    mockgoose.reset();
    createCompany.tenUsers( (err, createdCompanies, createdUsers) => {
        let req = {
            body: {
                firstName: "Tom",
                lastName: "Quinlan",
                email: createdUsers[0].email,
                password: "tomPassword"
            },
            params: {},
            session: {
                companyId: createdUsers[0]._id
            }
        };
        t.plan(3);
        putPostUser(req, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.BAD_REQUEST, "status should be ok");
            t.false(result, "result should be undefined");
            userMongoose.find({email: createdUsers[0].email}, (err, result) => {
                t.equal(result.length, 1, "only one user should exist");
            });
        });
    });
});

test("test post own user", t => {
    mockgoose.reset();
    createCompany.tenUsers( (err, createdCompanies, createdUsers) => {
        let req = {
            body: {
                firstName: "Tom",
                lastName: "Quinlan",
                email: "tom@aol.com",
                password: "tomPassword"
            },
            params: {
                userId: createdUsers[0]._id
            },
            session: {
                companyId: createdUsers[0]._id
            }
        };
        t.plan(3);
        putPostUser(req, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.OK, "status should be ok");
            t.deepEqual(_.pick(result, _.keys(req.body)), req.body);
            userMongoose.findOne({_id: createdUsers[0]._id}, (err, result) => {
                result = _.pick(result.toJSON(), _.keys(req.body));
                t.deepEqual(result, req.body, "result should be equal to response");
            });
        });
    });
});
