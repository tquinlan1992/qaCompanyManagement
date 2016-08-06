module.exports = app => {
    app.controller("sharedComponentsAddEditProductController", require("./addEditProductController"));
    app.factory('sharedComponentsAddEditProductAPI', require("./addEditProductAPI"));
};
