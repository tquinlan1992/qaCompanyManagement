module.exports = app => {
    app.filter('translate', require('./translate'));
};
