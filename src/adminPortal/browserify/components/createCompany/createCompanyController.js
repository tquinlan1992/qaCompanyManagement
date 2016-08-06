module.exports = ($scope, componentsCreateCompanyAPI, util, $state, host, $window) => {
    "ngInject";
    $scope.user = {
        firstName: "",
        lastName: "",
        subdomain: "",
        email: "",
        password: ""
    };

    $scope.createCompany = () => {
        componentsCreateCompanyAPI.putCompany($scope.user).success( response => {
            $window.location.href = response.redirect;
        });
    };
};
