module.exports = ($http, APIs) => {
        "ngInject";
        const companyAPI = APIs.API_SERVER + APIs.COMPANIES;
        const factory = {};

        factory.putCompany = user => {
            return $http.put(companyAPI, user);
        };

        return factory;
};
