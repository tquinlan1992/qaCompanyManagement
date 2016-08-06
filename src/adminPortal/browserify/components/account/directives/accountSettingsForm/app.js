module.exports = app => {
    app.directive("componentsAccountAccountSettingsForm", require("./directive"));
    app.factory('componentsDirectivesAccountSettingsFormAPI', require("./accountSettingsFormAPI"));
};
