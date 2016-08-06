module.exports = app => {
    app.controller('componentsCreateCompanyController', require('./createCompanyController'));
    app.factory('componentsCreateCompanyAPI', require("./createCompanyAPI"));
};
