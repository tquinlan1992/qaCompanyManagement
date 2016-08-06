const angular = require("angular");

const app = angular.module('util', []);

class Util {


}


app.factory('util', () => {
    return new Util();
});

module.exports = 'util';
