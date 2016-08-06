module.exports = function() {

	return {

		restrict: "E",
		templateUrl: "components/account/directives/accountSettingsForm/account-settings-form.html",
		scope: {
		},
		controller: ($scope, _, componentsDirectivesAccountSettingsFormAPI, $state, util, $stateParams, $mdDialog, $mdToast) => {
		    "ngInject";

		    $scope.account = {
		        firstName: "",
		        lastName: "",
		        email: "",
		        password: ""

		    };

			function getUserInfo() {
				componentsDirectivesAccountSettingsFormAPI.getUserInfo().success(response => {
					$scope.account = response;
				});
			}

			getUserInfo();

		    $scope.saveAccount = function() {
		            componentsDirectivesAccountSettingsFormAPI.postUser($scope.account._id, $scope.account).success( () => {
		                $mdToast.show({
		                    controller: 'sharedComponentsToastController',
		                    templateUrl: 'shared/components/toast/toast.html',
		                    hideDelay: 6000,
		                    position: "top right",
		                    resolve: {
		                        toastText: () => {
		                            return "Saved Account Information";
		                        }
		                    }
		                });
		                $mdDialog.hide(true);
		            });
		    };

		    $scope.cancel = function() {
		        $mdDialog.cancel();
		    };
		},
		resolve: {
			user: () => {
				return;
			}
		}
	};
};
