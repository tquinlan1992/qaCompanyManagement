const angular = require('angular');


const app = angular.module('app', [
    require('angular-ui-router'),
    require('angular-animate'),
    require("angular-resource"),
    require("./appInjectors/lodash"),
    require("angular-ui-bootstrap"),
    require("angular-material"),
    require("./appInjectors/util"),
    require("./appInjectors/http-status-codes")
]);



app.config(function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
});
