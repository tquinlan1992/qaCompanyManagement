module.exports = (_) => {
    "ngInject";
    return input => {
        return _.get(require("../../resources/locales_en-us"), input);
    };
};
