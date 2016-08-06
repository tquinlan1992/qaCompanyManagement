"use strict";
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const registerRoutes = require("../util/registerRoutes");

let getRoutes = [
    {
        url: '/',
        middleware:[],
        permission: true,
        response: require('./store/getStores')
    },
    {
        url: '/:storeName',
        middleware: [],
        permission: true,
        response: require('./store/getStore')
    }
];

let putRoutes = [
    {
        url: '/',
        permission: true,
        middleware: multipartMiddleware,
        response: require('./store/putPostStore')
    }
];

let postRoutes = [
    {
        url: "/:storeId",
        permission: true,
        middleware: multipartMiddleware,
        response: require("./store/putPostStore")
    }
];

let routes = {
    get: getRoutes,
    put: putRoutes,
    post: postRoutes
};

module.exports = registerRoutes(routes, {byMethod: true});
