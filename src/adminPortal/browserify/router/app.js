module.exports = app => {
    app.factory('routerUsersAPI', require("./usersAPI"));
    app.config(require("./router"));
};
