"use strict";
const _ = require("lodash");
const fs = require("fs");
const async = require("async");
const randomIdGenerator = require('random-id-generator');
const HTTP_STATUS_CODES = require('http-status-codes');
const Store = require('../../model/store/modelManager');

function saveImage(imageFile) {
    return done => {
        if (imageFile) {
            const imageExtension = '.'+imageFile.type.substring(6);
            const id = randomIdGenerator();
            const imagePath = "./images/" + id + imageExtension;
            fs.rename(imageFile.path, imagePath, function(err) {
                if (err) {
                    done({err: err, success: false, msg: 'did not save post, image didnt upload correctly'});
                } else {
                }
                done(null, imagePath, done);
            });
        } else {
            done(null, undefined, done);
        }
    };
}

module.exports = (req, done) => {
    const companyId = req.session.companyId;
    const imageFile = _.get(req, "files.image");

    async.waterfall([
        saveImage(imageFile),
        (imagePath, done) => {
            let store = _.assign(
                _.pick(req.body,["name", "description"]),
                {
                    address: _.pick(req.body.address, ["street", "city", "state"]),
                    imagePath: imagePath
                },
                {companyId: companyId}
            );
            let method= "putStore";
            const storeId = req.params.storeId;
            if (storeId) {
                method = "postStore";
            }
            const storeQuery = {
                storeId: storeId
            };
            const storeData = {
                newStore: store
            };
            Store(storeQuery, storeData)[method]((err, store) => {
                if (err === HTTP_STATUS_CODES.CONFLICT){
                    return done(HTTP_STATUS_CODES.CONFLICT);
                }
                else if (err) {
                    return done(HTTP_STATUS_CODES.BAD_REQUEST);
                } else {
                    return done(HTTP_STATUS_CODES.OK, store);
                }
            });
        }
    ], (status, result) => {
        done(status, result);
    }
);
};
