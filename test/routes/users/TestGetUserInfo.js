"use strict";

const mockgoose = require("../../MockgooseSetup");
const test = require("tape");
const getUserInfo = require("../../../src/server/routes/users/getUserInfo");
const createCompany = require("../createCompany");
const HTTP_STATUS_CODES = require("http-status-codes");
const _ = require("lodash");




test("test with valid user", function (t) {
    mockgoose.reset();
    t.plan(2);
    createCompany.tenUsers( (err, createdCompanies, createdUsers) => {
        let req = {
            headers: {
                origin: "http://" + createdCompanies[0].subdomain + ".domain:8000"
            },
            body : {
                email: createdUsers[0].email,
                password: createdUsers[0].password
            },
            session: {
                companyId: createdCompanies[0]._id,
                userId: createdUsers[0]._id
            }
        };
        getUserInfo(req, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.OK, "status should be OK");
            t.notok(_.difference(["email", "lastName", "firstName", "lastName"], _.keys(result.toJSON())).length, "the userInfo should include these properties");
        });
    });
});
