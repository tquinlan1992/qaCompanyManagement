module.exports = ($http, APIs) => {
        "ngInject";
        const productsAPI = APIs.API_SERVER + APIs.PRODUCTS;
        const disepensaryAPI = APIs.API_SERVER + APIs.STORE;
        const factory = {};

        factory.getStores = (verbose) => {
            return $http.get(disepensaryAPI + "?verbose=" + verbose);
        };


        factory.putProduct = (product) => {
            console.log("put", product);
            return $http.put(productsAPI, product);
        };

        factory.postProduct = (productId, product) => {
            return $http.post(productsAPI + productId, product);
        };

        factory.getProductKinds = () => {
            return $http.get(productsAPI + "productKinds");
        };

        return factory;
};
