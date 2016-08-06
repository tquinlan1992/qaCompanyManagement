module.exports = app => {
    app.controller('componentsProductsController', require('./productsController'));
    app.factory('componentsProductsAPI', require("./productsAPI"));
};
