"use strict";
const _ = require("lodash");
const HTTP_STATUS_CODES = require('http-status-codes');
const Product = require("../../model/product/modelManager");


module.exports = (req, callback) => {
    const productQuery = {
            companyId: req.session.companyId
    };
    Product(productQuery).getProductKindsByCompanyId((err, result) => {
        if (err) {
            callback(HTTP_STATUS_CODES.BAD_REQUEST);
        } else {
            _.remove(result, e => {
                return e === "";
            });
            callback(HTTP_STATUS_CODES.OK, result);
        }
    });
};
