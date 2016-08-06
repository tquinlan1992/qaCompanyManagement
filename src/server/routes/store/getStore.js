"use strict";

const HTTP_STATUS_CODES = require('http-status-codes');
const Store = require("../../model/store/modelManager");
const Product = require("../../model/product/modelManager");
const _ = require("lodash");


module.exports = (req, callback) => {
    const storeName = req.params.storeName;
    const companyId = req.session.companyId;
    const selectProperties = {};
    const storeQuery = {
        companyId: companyId,
        storeName: storeName,
        selectProperties: selectProperties
    };
    Store(storeQuery).getStoreByName((err, store) => {
        if (err || !store) {
            callback(HTTP_STATUS_CODES.BAD_REQUEST);
        } else {
            let response = store;

            const queryData = {
                query: {
                    companyId: companyId,
                    storeIds: [store._id]
                }
            };
            Product(queryData).getProductsByCompanyIdAndStoreIds((err, menu) => {
                _.assign(response, {menu: menu});
                callback(HTTP_STATUS_CODES.OK, response);
            });
        }
    });
};
