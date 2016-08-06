module.exports = ($http, APIs) => {
        "ngInject";
        const disepensaryAPI = APIs.API_SERVER + APIs.STORE;
        const factory = {};

        factory.putStore = (store) => {
            return $http.put(disepensaryAPI, store);
        };

        factory.postStore = (store, storeId) => {
            return $http.post(disepensaryAPI + storeId, store);
        };

        return factory;
};
