"use strict";
const mockgoose = require("../../MockgooseSetup");
const getProductKinds = require("../../../src/server/routes/products/getProductKinds");
const createCompany = require("../createCompany");
const test = require("tape");
const HTTP_STATUS_CODES = require('http-status-codes');
const _ = require("lodash");
const Product = require("../../../src/server/model/product/productSchema");


test("get products", t => {
    t.plan(2);
    mockgoose.reset();
    createCompany.tenUsers( (err, companies) => {
        const product = {
            name: "menuItemName",
            description: "menuItemDescription",
            kind: "menuItemKind",
            companyId: companies[0]._id
        };
        Product.create(_.cloneDeep(product), () => {
            const req = {
                session: {
                    companyId: companies[0]._id
                },
                query: {

                }
            };
            getProductKinds(req, (status, result) => {
                t.equal(status, HTTP_STATUS_CODES.OK);
                t.deepEqual(result, [product.kind]);
            });
        });
    });
});
