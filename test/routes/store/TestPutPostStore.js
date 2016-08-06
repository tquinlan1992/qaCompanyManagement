"use strict";
const mockgoose = require("../../MockgooseSetup");
const putPostStore = require("../../../src/server/routes/store/putPostStore");
const createCompany = require("../createCompany");
const test = require("tape");
const _ = require("lodash");
const HTTP_STATUS_CODES = require('http-status-codes');



test("test put store", t => {
    mockgoose.reset();
    createCompany.tenUsers( (err, companies) => {
        t.plan(2);
        var companyId = companies[0]._id;
        const req = {
            body : {
                name: "name",
                description: "description",
                address: {
                    street: "street",
                    city: "city",
                    state: "state"
                }
            },
            session: {
                companyId: companyId
            },
            params: {

            }
        };
        putPostStore(req, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.OK, "status should be ok");
            const expectedRespnse = _.assign({},
                req.body,
                req.session
            );
            t.deepEqual(_.pick(result.toJSON(), _.keys(expectedRespnse)), expectedRespnse);
        });
    });
});

test("test put store no name", t => {
    mockgoose.reset();
    createCompany.tenUsers( (err, result) => {
        t.plan(2);
        var companyId = result[0]._id;
        const req = {
            body : {
                name: ""
            },
            session: {
                companyId: companyId
            },
            params: {

            }
        };
        putPostStore(req, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.BAD_REQUEST, "status should be 400");
            t.equal(result, undefined, "result should be undefined");
        });
    });
});

test("test post store", t => {
    mockgoose.reset();
    createCompany.tenUsers( (err, companies) => {
        t.plan(2);
        var companyId = companies[0]._id;
        const req = {
            body : {
                name: "name",
                description: "description",
                address: {
                    street: "street",
                    city: "city",
                    state: "state"
                }
            },
            session: {
                companyId: companyId
            },
            params: {

            }
        };
        putPostStore(req, (status, result) => {
            const postStoreReq = {
                body : {
                    name: "newName",
                    description: "newDescription",
                    address: {
                        street: "newStreet",
                        city: "newCity",
                        state: "newState"
                    }
                },
                session: {
                    companyId: companyId
                },
                params: {
                    storeId: result._id
                }
            };

            putPostStore(_.cloneDeep(postStoreReq), (status, result) => {
                t.equal(status, HTTP_STATUS_CODES.OK, "status should be ok");

                const expectedRespnse = _.assign({},
                    postStoreReq.body,
                    postStoreReq.session
                );
                t.deepEqual(_.pick(result.toJSON(), _.keys(expectedRespnse)), expectedRespnse);
            });

        });
    });
});

test("test post store with wrong id", t => {
    mockgoose.reset();
    createCompany.tenUsers( (err, companies) => {
        t.plan(2);
        var companyId = companies[0]._id;
        const req = {
            body : {
                name: "name",
                description: "description",
                address: {
                    street: "street",
                    city: "city",
                    state: "state"
                }
            },
            session: {
                companyId: companyId
            },
            params: {

            }
        };
        putPostStore(req, () => {
            const postStoreReq = {
                body : {
                    name: "newName",
                    description: "newDescription",
                    address: {
                        street: "newStreet",
                        city: "newCity",
                        state: "newState"
                    }
                },
                session: {
                    companyId: companyId
                },
                params: {
                    storeId: "badId"
                }
            };

            putPostStore(_.cloneDeep(postStoreReq), (status, result) => {
                t.equal(status, HTTP_STATUS_CODES.BAD_REQUEST, "status should be a bad request");

                t.equal(result, undefined, "result should be undefined");
            });

        });
    });
});
