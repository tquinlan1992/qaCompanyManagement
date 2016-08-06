module.exports = ($http, APIs) => {
        "ngInject";
        const companyAPI = APIs.API_SERVER + APIs.COMPANIES;
        const factory = {};

        factory.loginCompany = loginCredentials => {
            return $http.post(companyAPI + "loginCompany", loginCredentials);
        };

        return factory;
};
