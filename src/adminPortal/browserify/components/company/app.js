module.exports = app => {
    app.controller('componentsCompanyController', require('./companyController'));
    app.factory('componentsCompanyAPI', require("./companyAPI"));
    require("./directives/directives")(app);
};
