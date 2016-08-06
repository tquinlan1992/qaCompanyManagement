module.exports = ($http, APIs) => {
        "ngInject";
        const companyAPI = APIs.API_SERVER + APIs.COMPANIES;
        const factory = {};

        factory.logout = () => {
            return $http.get(companyAPI + "logoutCompany");
        };

        factory.getCompanyInfo = (selectProperties) => {
            return $http.get(companyAPI + "getCompanyInfo", selectProperties);
        };

        return factory;
};
