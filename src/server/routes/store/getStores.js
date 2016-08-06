"use strict";
const HTTP_STATUS_CODES = require('http-status-codes');
const Store = require("../../model/store/modelManager");


module.exports = (req, callback) => {
    let selectProperties = {"name": 1, "_id": 1};
    if (JSON.parse(req.query.verbose)) {
        selectProperties = {};
    }
    const storeQuery = {
        companyId: req.session.companyId,
        selectProperties: selectProperties
    };
    Store(storeQuery).getStoresByCompanyId((err, result) => {
        callback(HTTP_STATUS_CODES.OK, result);
    });
};
