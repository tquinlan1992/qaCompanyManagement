module.exports = app => {
    app.controller('componentsSidenavController', require('./sidenavController'));
    app.factory('componentsSidenavAPI', require("./sidenavAPI"));
};
