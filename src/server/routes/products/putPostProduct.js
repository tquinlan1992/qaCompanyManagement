"use strict";
const _ = require("lodash");
const fs = require("fs");
const async = require("async");
const randomIdGenerator = require('random-id-generator');
const HTTP_STATUS_CODES = require('http-status-codes');
const Product = require('../../model/product/modelManager');

function saveImage(imageFile) {
    return callback => {
        if (imageFile) {
            const imageExtension = '.'+imageFile.type.substring(6);
            const id = randomIdGenerator();
            const imagePath = "./images/" + id + imageExtension;
            fs.rename(imageFile.path, imagePath, function(err) {
                if (err) {
                    callback({err: err, success: false, msg: 'did not save post, image didnt upload correctly'});
                } else {
                }
                callback(null, imagePath, callback);
            });
        } else {
            callback(null, undefined, callback);
        }
    };
}

module.exports = (req, callback) => {
    const companyId = req.session.companyId;
    const imageFile = _.get(req, "files.image");
    const productId = req.params.productId;

    async.waterfall([
        saveImage(imageFile),
        (imagePath, callback) => {
            let method = "putProduct";
            req.body.companyId = companyId;
            if (productId) {
                method = "postProduct";
            }
            const productQuery = {
                    productId: productId
            };
            const productData = {
                newProduct: req.body
            };
            Product(productQuery, productData)[method]((err, result) => {
                    if (err) {
                        callback(HTTP_STATUS_CODES.BAD_REQUEST);
                    } else {
                        callback(HTTP_STATUS_CODES.OK, result);
                    }
            });
        }
    ], (status, result) => {
        callback(status, result);
    }
);
};
