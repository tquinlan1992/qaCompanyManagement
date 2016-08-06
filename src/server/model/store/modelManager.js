"use strict";
const _ = require("lodash");
const Store = require("./storeSchema");
const HTTP_STATUS_CODES = require("http-status-codes");

class StoreModel {
    constructor(query, data) {
        this.query = query;
        this.data = data;
    }

    putStore(done) {
        const newStore = this.data.newStore;
        Store.create(newStore, done);
    }

    getStoreByName(done) {
        const companyId = this.query.companyId;
        const storeName = this.query.storeName;
        const selectProperties = this.query.selectProperties;
        Store.findOne({companyId: companyId, name: storeName}, selectProperties, done);
    }

    getStoresByCompanyId(done) {
        const companyId = this.query.companyId;
        const selectProperties = this.query.selectProperties;
        Store.find({companyId: companyId}, selectProperties, done);
    }

    postStore(done) {
        const storeId = this.query.storeId;
        const newStore = this.data.newStore;
        Store.findOne({_id: storeId}, (err, store) => {
            if (store) {
            _.assign(store, newStore);
            store.save((err, result) => {
                if (result) {
                    done(err, store);
                } else {
                    done(err, null);
                }
            });
        } else {
            done(HTTP_STATUS_CODES.BAD_REQUEST);
        }
        });
    }

}

module.exports = _.rest(rest => {
    return new StoreModel(...rest);
});
