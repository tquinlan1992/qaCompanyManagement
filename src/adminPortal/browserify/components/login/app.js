module.exports = app => {
    app.controller('componentsLoginController', require('./loginController'));
    app.factory('componentsLoginAPI', require("./loginAPI"));
};
