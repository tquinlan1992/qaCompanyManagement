module.exports = ($scope, componentsLoginAPI, util, $state, host, $window) => {
    "ngInject";
    $scope.loginCredentials= {
        email: "",
        password: "",
        subdomain: ""
    };

    $scope.subdomain = host.subdomain;

    $scope.login = () => {
        componentsLoginAPI.loginCompany($scope.loginCredentials).success(function(response) {
            if (host.subdomain === response.subdomain) {
                    $state.go("app.user.store.stores");
            } else {
                $window.location.href = response.redirect;
            }
        }).error( () => {
        });
    };
};
