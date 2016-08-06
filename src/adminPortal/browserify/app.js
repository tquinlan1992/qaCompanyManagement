const angular = require("angular");

const app = angular.module('app', [   // jshint ignore:line
    require('angular-ui-router'),
    require('angular-animate'),
    require("angular-resource"),
    require("./appInjectors/lodash"),
    require("angular-material"),
    require("./appInjectors/util"),
    require("./appInjectors/http-status-codes")
]);


require("./shared/directives/directives")(app);
require("./components/components")(app);
require("./shared/components/components")(app);
require("./factories/factories")(app);
require("./router/app")(app);
require("./configs/configs")(app);
require("./filters/filters")(app);

app.config(function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
});
