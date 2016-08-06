module.exports = app => {
    app.controller("componentsUsersController", require("./usersController"));
    app.factory('componentsUsersAPI', require("./usersAPI"));
    require("./directives/directives")(app);
};
