"use strict";
const registerRoutes = require("../util/registerRoutes");

let getRoutes = [
    {
        url: '/logoutCompany',
        response: require('./companies/logoutCompany')
    },
    {
        permission: true,
        url: '/getCompanyInfo',
        response: require('./companies/getCompanyInfo')
    }
];

let putRoutes = [
    {
        url: '/',
        response: require('./companies/putPostCompany')("put")
    }
];

let postRoutes = [
    {
        url: '/loginCompany',
        response: require('./companies/loginCompany')
    },
    {
        permission: true,
        url: '/',
        response: require('./companies/putPostCompany')("post")
    }
];

let routes = {
    get: getRoutes,
    put: putRoutes,
    post: postRoutes
};


module.exports = registerRoutes(routes, {byMethod: true});
