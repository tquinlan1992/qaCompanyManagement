module.exports = ($http, APIs) => {
        "ngInject";
        const companyAPI = APIs.API_SERVER + APIs.COMPANIES;
        const factory = {};

        factory.postCompany = user => {
            return $http.post(companyAPI, user);
        };

        factory.getCompanyInfo = (selectProperties) => {
            return $http.get(companyAPI + "getCompanyInfo", selectProperties);
        };

        return factory;
};
