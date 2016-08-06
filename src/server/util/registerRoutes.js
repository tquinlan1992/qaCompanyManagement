"use strict";
const _ = require("lodash");
const permissionManager = require("../middleware/permissionManager");
const express = require('express');
const serverConstants = require("../constants/server");

// Route Model
// permission: [function(req, res, next)]  - array of middleware functions, usually will only be one to check permission (all should have to do with permission); can be empty
// middleware: [function(req, res, next)]  - array of middleware functions; can be empty

// response: function(req, res, next)  - function should respond with http status (required) and response (or none) (status, response); the response property must have a function

function putSubdomainOnReq(req, res, next) {
    const domain = req.headers.origin;
    const lowerCaseDomain = _.toLower(serverConstants.DOMAIN);
    const subdomainStart = domain.indexOf("http://") + 7;
    const subdomainEnd = domain.indexOf("." + lowerCaseDomain);
    req.subdomain = subdomainEnd !== -1 ? domain.slice(subdomainStart, subdomainEnd) : false;
    next();
}

function addMethodToRoute(method, routes) {
    _.forEach(routes, route => {
        route.method = method;
    });
    return routes;
}

function addMethodsToRoutes(routes) {
    let modifiedRoutes = [];
    _.forEach(routes, (routesByMethod, key) => {
        modifiedRoutes = _.concat(modifiedRoutes, (addMethodToRoute(key, routesByMethod)));
    });
    return modifiedRoutes;
}

function responseFunction(route, req, res) {
    route(req, (status, result) => {
        res.status(status);
        res.json(result).end();
    });
}

function addResponseFunction(routes) {
    _.forEach(routes, route => {
        if (_.isArray(route.response)) {
            route.response = _.partial(
                responseFunction,
                ...route.response
            );
        } else {
            route.response = _.partial(
                responseFunction,
                route.response
            );
        }
    });
}

function addToRouter(router, routes) {
    _.forEach(routes, route => {
        router[route.method](
            route.url,
            ..._.concat(
                putSubdomainOnReq,
                route.permission ? [_.partial(permissionManager)] : [],
                route.middleware ? route.middleware : [],
                route.response
            )
        );
    });
}

module.exports = (routes, options) => {

    let router = express.Router();

    if (options.byMethod) {
        routes = addMethodsToRoutes(routes);
    }

    addResponseFunction(routes);

    addToRouter(router, routes);

    return router;
};
