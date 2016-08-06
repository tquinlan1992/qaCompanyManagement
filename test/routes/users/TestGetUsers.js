"use strict";

const mockgoose = require("../../MockgooseSetup");
const test = require("tape");
const getUsers = require("../../../src/server/routes/users/getUsers");
const createCompany = require("../createCompany");
const HTTP_STATUS_CODES = require("http-status-codes");
const _ = require("lodash");



test("test with valid user", function (t) {
    mockgoose.reset();
    t.plan(3);
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
            getUsers(req, (status, result) => {
                t.equal(status, HTTP_STATUS_CODES.OK, "status should be OK");
                t.equal(result.length, 1);
                t.notok(_.difference(["email", "lastName", "firstName", "lastName"], _.keys(result[0].toJSON())).length, "the userInfo should include these properties");
            });
        });
});
