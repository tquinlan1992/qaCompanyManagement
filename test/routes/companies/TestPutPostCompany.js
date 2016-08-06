"use strict";
var mockgoose = require("../../MockgooseSetup");
const mongoose = require("mongoose");
const putCompany = require("../../../src/server/routes/companies/putPostCompany")("put");
const postCompany = require("../../../src/server/routes/companies/putPostCompany")("post");
const createCompany = require("../createCompany");
const test = require("tape");
const _ = require("lodash");
const HTTP_STATUS_CODES = require('http-status-codes');
const subdomainURL = require("../../../src/server/util/subdomainURL");


mockgoose.reset();
const companyMongoose = mongoose.connection.models.Company;

test("test with valid company", t => {
    mockgoose.reset();
    let req = {
        body: {
            firstName: "Tom",
            lastName: "Quinlan",
            email: "tom@aol.com",
            password: "tomPassword",
            subdomain: "a"
        },
        session: {}
    };
    t.plan(3);
    putCompany(req, (status, result) => {
        t.equal(status, HTTP_STATUS_CODES.OK, "status should be ok");
        t.deepEqual(result, { redirect: 'http://' + req.body.subdomain + '.localhost:8000', subdomain: req.body.subdomain });
        companyMongoose.find({subdomain: "a"}, (err, result) => {
            result = _.omit(result[0].toJSON(), ['_id', '__v']);
            let expectedAnswer = {
                subdomain: "a"
            };
            t.deepEqual(_.pick(result, _.keys(expectedAnswer)), expectedAnswer, "result should be equal to response");
        });
    });
});

function testRequiredField(req, t) {
    t.plan(3);
    mockgoose.reset();
    putCompany(req, (status, result) => {
        t.equal(status, HTTP_STATUS_CODES.BAD_REQUEST, "status should be bad request");
        t.true(_.isUndefined(result), "result should be undefined");
        companyMongoose.find({}, (err, result) => {
            t.equal(result.length, 0, "There should be no app users created");
        });
    });
}

test("test put company with no firstName", _.partial(testRequiredField,
    {
        body: {
            lastName: "Quinlan",
            password: "tomPassword",
            email: "tom@aol.com"
        },
        session: {}
    })
);


test("test put company with no lastName", _.partial(testRequiredField,
    {
        body: {
            firstName: "Tom",
            password: "tomPassword",
            email: "tom@aol.com"
        },
        session: {}
    })
);


test("test put company with no email", _.partial(testRequiredField,
    {
        body: {
            firstName: "Tom",
            lastName: "Quinlan",
            password: "tomPassword"
        },
        session: {}
    })
);


test("test put company with no password", _.partial(testRequiredField,
    {
        body: {
            firstName: "Tom",
            lastName: "Quinlan",
            email: "tom@aol.com"
        },
        session: {}
    })
);



test("test with duplicate company", t => {
    mockgoose.reset();
    createCompany.oneUser(() => {


        let req = {
            body: {
                firstName: "firstName",
                lastName: "lastName",
                email: "email@email.com",
                password: "password"
            },
            session: {}
        };
        t.plan(2);
        putCompany(req, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.BAD_REQUEST, "err should be a bad request");
            t.true(_.isUndefined(result), "result should be undefined");
        });
    });
});


test("test put ten app users", t => {
    mockgoose.reset();
    t.plan(3);
    createCompany.tenUsers( (status, result) => {
        t.equal(status, null, "err should be null");
        t.ok(_.keys(result).length > 0, "result should not be falsey");
        companyMongoose.find({}, (err, result) => {
            t.ok(result.length === 10, "There should be 10  users created");
        });
    });
});


test("test post company", t => {
    mockgoose.reset();
    t.plan(3);
    createCompany.tenUsers( (status, companies, users) => {
        let req = {
            body: {
                subdomain: "b"
            },
            session: {
                companyId: companies[0]._id,
                userId: users[0]._id
            }
        };
        postCompany(_.cloneDeep(req), (status, response) => {
            t.equal(status, HTTP_STATUS_CODES.OK, "status should be ok");
            t.deepEqual(_.pick(response, ["subdomain", "redirect"]), {subdomain: req.body.subdomain, redirect: subdomainURL(req.body.subdomain)});
            companyMongoose.findOne({_id: companies[0]._id}, (err, result) => {
                t.deepEqual(_.pick(result, _.keys(req.body)), req.body, "result should be equal to response");
            });
        });
    });
});
