module.exports = ($http, APIs) => {
        "ngInject";
        const productsAPI = APIs.API_SERVER + APIs.PRODUCTS;
        const factory = {};

        factory.getProducts = () => {
            return $http.get(productsAPI);
        };

        return factory;
};
