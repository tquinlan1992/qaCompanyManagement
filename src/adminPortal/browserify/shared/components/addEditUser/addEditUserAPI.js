module.exports = ($http, APIs) => {
        "ngInject";
        const usersAPI = APIs.API_SERVER + APIs.USERS;
        const factory = {};

        factory.putUser = (user) => {
            return $http.put(usersAPI, user);
        };

        factory.postUser = (userId, user) => {
            return $http.post(usersAPI + userId, user);
        };

        return factory;
};
