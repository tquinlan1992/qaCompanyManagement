"use strict";
const HTTP_STATUS_CODES = require('http-status-codes');
const Product = require("../../model/product/modelManager");
const JSONParse = require("../../util/JSONParse");


module.exports = (req, callback) => {
    const stores = JSONParse(req.query.stores);
    const productQuery = {
            companyId: req.session.companyId,
            stores: stores ? stores : null
    };
    Product(productQuery).getProductsByCompanyIdAndStoreIds((err, result) => {
        callback(HTTP_STATUS_CODES.OK, result);
    });
};
