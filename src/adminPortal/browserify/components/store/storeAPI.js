module.exports = ($http, APIs) => {
        "ngInject";
        const disepensaryAPI = APIs.API_SERVER + APIs.STORE;
        const productAPI = APIs.API_SERVER + APIs.PRODUCTS;
        const factory = {};

        factory.getStore = storeName =>{
            return $http.get(disepensaryAPI + storeName);
        };

        factory.getStoreProducts = storeId => {
            return $http.get(productAPI + "?stores=" + JSON.stringify([storeId]));
        };


        return factory;
};
