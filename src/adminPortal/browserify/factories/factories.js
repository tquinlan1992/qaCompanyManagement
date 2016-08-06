module.exports = app => {
    app.factory('APIs', require('./APIs'));
    app.factory('host', require('./host'));
};
