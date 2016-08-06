module.exports = app => {
    app.controller("componentsAccountController", require("./accountController"));
    require("./directives/directives")(app);
};
