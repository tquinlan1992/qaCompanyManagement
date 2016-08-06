"use strict";
const mockgoose = require("../../MockgooseSetup");
const putPostProduct = require("../../../src/server/routes/products/putPostProduct");
const createCompany = require("../createCompany");
const test = require("tape");
const HTTP_STATUS_CODES = require('http-status-codes');
const _ = require("lodash");


function testValidPutMenuItem(testMissingProperty) {
    test("put valid product, properties missing: " + testMissingProperty, t => {
        t.plan(2);
        mockgoose.reset();
        createCompany.tenUsers( (err, companies) => {
            let companyId = companies[0]._id;
            let product =     {
                name: "menuItemName",
                description: "menuItemDescription",
                kind: "menuItemKind"
            };
            product = _.omit(product, testMissingProperty);
            const putProductReq = {
                body : _.cloneDeep(product),
                session: {
                    companyId: companyId
                },
                params: {}
            };
            putPostProduct(putProductReq, (status, result) => {
                t.equal(status, HTTP_STATUS_CODES.OK, "status should be 'OK'");
                const expectedProduct = _.assign({}, product, {companyId: companyId});
                t.deepEqual(_.pick(result.toJSON(), _.keys(expectedProduct)), expectedProduct, "result should equal menuItemReq");
            });
        });
    });
}

testValidPutMenuItem(
    "none"
);

testValidPutMenuItem(
    "description"
);

testValidPutMenuItem(
    "kind"
);

testValidPutMenuItem(
    ["description, kind"]
);

test("test put product no name", t => {
    t.plan(2);
    mockgoose.reset();
    createCompany.tenUsers( (err, companies) => {
        let companyId = companies[0]._id;
        const product =  {
            description: "menuItemDescription",
            kind: "menuItemKind"
        };
        const putProductReq = {
            body : _.cloneDeep(product),
            session: {
                companyId: companyId
            },
            params: {}
        };
        putPostProduct(putProductReq, (status, result) => {
            t.equal(status, HTTP_STATUS_CODES.BAD_REQUEST, "status should be 400");
            t.equal(result, undefined, "result should be undefined");
        });
    });
});


function testValidPostMenuItem(testMissingProperty) {
    test("post valid product, properties missing: " + testMissingProperty, t => {
        t.plan(2);
        mockgoose.reset();
        createCompany.tenUsers( (err, companies) => {
            const companyId = companies[0]._id;
            let product = {
                name: "menuItemName",
                description: "menuItemDescription",
                kind: "menuItemKind"
            };

            product = _.omit(product, testMissingProperty);
            let putProductReq = {
                body : _.cloneDeep(product),
                session: {
                    companyId: companyId
                },
                params: {}
            };
            putPostProduct(putProductReq, (status, putResult) => {
                putProductReq.name = "new Name";
                putProductReq.params.productId = putResult._id;
                putPostProduct(putProductReq, (status, postResult) => {
                    t.equal(status, HTTP_STATUS_CODES.OK, "status should be 'OK'");
                    t.deepEqual(_.pick(postResult, _.keys(product)), product, "result should equal menuItemReq");
                });
            });
        });
    });
}

testValidPostMenuItem(
    "none"
);

testValidPostMenuItem(
    "description"
);

testValidPostMenuItem(
    "kind"
);

testValidPostMenuItem(
    ["description, kind"]
);

test("post invalid product: no name" , t => {
    t.plan(2);
    mockgoose.reset();
    createCompany.tenUsers( (err, companies) => {
        let companyId = companies[0]._id;
        const product = {
            name: "menuItemName",
            description: "menuItemDescription",
            kind: "menuItemKind"
        };
        let putProductReq = {
            body : product,
            session: {
                companyId: companyId
            },
            params: {}
        };
        putPostProduct(putProductReq, (status, putResult) => {
            putProductReq.body.name = "";
            putProductReq.params.productId = putResult._id;
            putPostProduct(putProductReq, (status, postResult) => {
                t.equal(status, HTTP_STATUS_CODES.BAD_REQUEST, "status should be a 'BAD_REQUEST'");
                t.notok(postResult, "result should be undefined");
            });
        });
    });
});
