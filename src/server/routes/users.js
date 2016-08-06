"use strict";
const registerRoutes = require("../util/registerRoutes");

let getRoutes = [
    {
        permission: true,
        url: '/getUserInfo',
        response: require('./users/getUserInfo')
    },
    {
        permission: true,
        url: '/getLoginStatus',
        response: require('./users/getLoginStatus')
    },
    {
        permission: true,
        url: '/',
        response: require('./users/getUsers')
    }
];

let putRoutes = [
    {
        permission: true,
        url: '/',
        response: require('./users/putPostUser')
    }
];

let postRoutes = [
    {
        permission: true,
        url: '/:userId',
        response: require('./users/putPostUser')
    }
];

let routes = {
    get: getRoutes,
    put: putRoutes,
    post: postRoutes
};


module.exports = registerRoutes(routes, {byMethod: true});
