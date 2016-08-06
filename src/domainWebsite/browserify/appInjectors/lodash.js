const angular = require("angular");

const app = angular.module('lodash', []);

app.factory('_', () => {
	return require("lodash");
});

module.exports = 'lodash';
