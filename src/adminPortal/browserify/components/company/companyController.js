module.exports = ($scope, componentsCompanyAPI, $mdToast) => {
    "ngInject";

    $scope.account = {};

    function getAccount() {
        componentsCompanyAPI.getCompanyInfo().success( response => {
            $scope.account = response;
        });
    }

    getAccount();



    $scope.saveAccount = () => {
            componentsCompanyAPI.postCompany($scope.account).success( response => {
                $mdToast.show({
                    controller: 'sharedComponentsToastController',
                    templateUrl: 'shared/components/toast/toast.html',
                    hideDelay: 6000,
                    position: "top right",
                    resolve: {
                        toastText: () => {
                            return "Saved account information";
                        }
                    }
                });
                console.log("Saved User", response);
            });
    };

};
