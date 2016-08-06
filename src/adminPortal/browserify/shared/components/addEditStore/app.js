module.exports = app => {
        app.controller("sharedComponentsAddEditStoreController", require("./addEditStoreController"));
        app.factory('sharedComponentsAddEditStoreAPI', require("./addEditStoreAPI"));
};
