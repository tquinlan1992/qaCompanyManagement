module.exports = app => {
    app.controller('componentsStoresController', require('./storesController'));
    app.factory('componentsStoresAPI', require("./storesAPI"));
};
