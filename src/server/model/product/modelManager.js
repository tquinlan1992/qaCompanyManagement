"use strict";
const _ = require("lodash");
const Product = require("./productSchema");

class ProductModel {
    constructor(query, data) {
        this.query = query;
        this.data = data;
    }

    putProduct(done) {
        const newProduct = this.data.newProduct;
        Product.create(newProduct, done);
    }

    postProduct(done) {
        const productId = this.query.productId;
        const newProduct = this.data.newProduct;
        Product.findOne({_id: productId}, (err, product) => {
            _.assign(product, newProduct);
            product.save(done);
        });
    }

    getProductsByCompanyIdAndStoreIds(done) {
        const companyId = this.query.companyId;
        const stores = this.query.stores;
        const query = _.assign({},
            {
            companyId: companyId,
        },
        stores ? {stores: {$in: stores}} : {}
    );
        Product.find(query, done);
    }

    getProductKindsByCompanyId(done) {
        const companyId = this.query.companyId;
        Product.find({companyId: companyId})
        .distinct("kind").
        exec(done);
    }
}

module.exports = _.rest(rest => {
    return new ProductModel(...rest);
});
