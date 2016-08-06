"use strict";
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const registerRoutes = require("../util/registerRoutes");

let getRoutes = [
    {
        url: '/',
        permission: true,
        middleware: multipartMiddleware,
        response: require('./products/getProducts')
    },
    {
        url: '/productKinds',
        permission: true,
        response: require('./products/getProductKinds')
    }
];

let putRoutes = [
    {
        url: '/',
        permission: true,
        middleware: multipartMiddleware,
        response: require('./products/putPostProduct')
    }
];

let postRoutes = [
    {
        url: '/:productId',
        permission: true,
        middleware: multipartMiddleware,
        response: require('./products/putPostProduct')
    }
];

let routes = {
    put: putRoutes,
    post: postRoutes,
    get: getRoutes
};

module.exports = registerRoutes(routes, {byMethod: true});
