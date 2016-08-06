module.exports = app => {
    app.controller("sharedComponentsAddEditUserController", require("./addEditUserController"));
    app.factory('sharedComponentsAddEditUserAPI', require("./addEditUserAPI"));
};
