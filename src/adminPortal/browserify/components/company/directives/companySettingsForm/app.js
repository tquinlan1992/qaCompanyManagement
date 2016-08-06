module.exports = app => {
    app.directive("componentsCompanyCompanySettingsForm", require("./directive"));
    app.factory('componentsCompanyDirectivesCompanySettingsFormAPI', require("./companySettingsFormAPI"));
};
