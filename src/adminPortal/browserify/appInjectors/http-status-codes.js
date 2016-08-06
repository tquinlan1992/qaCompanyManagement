const angular = require("angular");

const app = angular.module('HTTP_STATUS_CODES', []);

app.factory('HTTP_STATUS_CODES', () => {
	return require("http-status-codes");
});

module.exports = 'HTTP_STATUS_CODES';
