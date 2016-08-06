module.exports = ($http, APIs) => {
        "ngInject";
        const usersAPI = APIs.API_SERVER + APIs.USERS;
        const factory = {};

        factory.getUsers = () => {
            return $http.get(usersAPI);
        };

        return factory;
};
