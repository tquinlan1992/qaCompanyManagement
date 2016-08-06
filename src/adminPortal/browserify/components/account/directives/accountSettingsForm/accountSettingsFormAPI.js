module.exports = ($http, APIs) => {
        "ngInject";
        const usersAPI = APIs.API_SERVER + APIs.USERS;
        const factory = {};

        factory.getUserInfo = (selectProperties) => {
            return $http.get(usersAPI + "getUserInfo", selectProperties);
        };

        factory.postUser = (userId, user) => {
            return $http.post(usersAPI + userId, user);
        };

        return factory;
};
