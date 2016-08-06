module.exports = ($http, APIs) => {
        "ngInject";
        const usersAPI = APIs.API_SERVER + APIs.USERS;
        const factory = {};

        factory.getLoginStatus = () => {
            return $http.get(usersAPI + "getLoginStatus");
        };

        return factory;
};
