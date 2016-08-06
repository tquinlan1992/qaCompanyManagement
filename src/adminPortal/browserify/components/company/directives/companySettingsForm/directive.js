module.exports = function() {

	return {

		restrict: "E",
		templateUrl: "components/company/directives/companySettingsForm/company-settings-form.html",
		scope: {
		},

		controller:
		function ($scope, componentsCompanyDirectivesCompanySettingsFormAPI, $mdToast, $window) {
            "ngInject";
            $scope.account = {};

            function getAccount() {
                componentsCompanyDirectivesCompanySettingsFormAPI.getCompanyInfo().success( response => {
                    $scope.account = response;
                });
            }

            getAccount();



            $scope.saveAccount = () => {
                    componentsCompanyDirectivesCompanySettingsFormAPI.postCompany($scope.account).success( response => {
						$window.location.href = response.redirect + '/company';
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
		}
	};
};
