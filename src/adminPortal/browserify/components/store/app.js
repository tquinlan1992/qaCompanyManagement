module.exports = app => {
    app.controller('componentsStoreStoreController', require('./storeController'));
    app.factory('componentsStoreAPI', require("./storeAPI"));
};
