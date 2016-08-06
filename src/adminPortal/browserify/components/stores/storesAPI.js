module.exports = ($http, APIs) => {
        "ngInject";
        const disepensaryAPI = APIs.API_SERVER + APIs.STORE;
        const factory = {};

        factory.getStores = (verbose) => {
            return $http.get(disepensaryAPI + "?verbose=" + verbose);
        };

        return factory;
};
