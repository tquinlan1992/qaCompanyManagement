const mockgoose = require("../../MockgooseSetup");
const test = require("tape");
const loginCompany = require("../../../src/server/routes/companies/loginCompany");
const logoutCompany = require("../../../src/server/routes/companies/logoutCompany");
const getLoginStatus = require("../../../src/server/routes/companies/getLoginStatus");
const createCompany = require("../createCompany");
const HTTP_STATUS_CODES = require("http-status-codes");
const subdomainURL = require("../../../src/server/util/subdomainURL");
const async = require('async');
const _ = require("lodash");


let asyncFunctions = {
    createReq: function(t, callback) {
        createCompany.tenUsers( (err, createdCompanies, createdUsers) => {
            const req = {
                subdomain: createdCompanies[0].subdomain,
                body : {
                    email: createdUsers[0].email,
                    password: createdUsers[0].password
                },
                session: {}
            };
            callback(null, t, req);
        });
    },
    loginCompany: function (t, req, callback) {
        loginCompany(req, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.OK, "status should be OK");
            t.deepEqual(result, {subdomain: req.subdomain, redirect: subdomainURL(req.subdomain)}, "the result should have the subdomain");
            callback(null, t, req);
        });
    },
    getLoginStatus: function(t, req, callback) {
        getLoginStatus(req, (status, result) => {
            t.equal(HTTP_STATUS_CODES.OK, status, "status should be OK");
            t.deepEqual(result, {subdomain: req.subdomain, redirect: subdomainURL(req.subdomain)});
            callback(null, t, req);
        });
    },
    logoutCompany: function(t, req, callback) {
        logoutCompany(req, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.OK, "status should be OK");
            t.deepEqual(result, {}, "result should be empty object");
            t.end();
            callback(null);
        });
    }
};

test("test with valid user", function (t) {
    mockgoose.reset();
    async.waterfall([
        _.partial(asyncFunctions.createReq, t),
        asyncFunctions.loginCompany,
        asyncFunctions.getLoginStatus,
        asyncFunctions.logoutCompany
    ]);
});


test("test with invalid user", function (t) {
    mockgoose.reset();
    const req = {
        subdomain: "a",
        body : {
            email: "email@email.com10",
            password: "password10"
        },
        session: {}
    };
    loginCompany(req, (status, result) => {
        t.equal(status, HTTP_STATUS_CODES.UNAUTHORIZED, "status should be UNAUTHORIZED");
        t.notOk(result, "result should be falsey");
        t.end();
    });
});
