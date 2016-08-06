module.exports = function() {

	return {

		restrict: "E",
		templateUrl: "components/users/directives/usersTable/users-table.html",
		scope: {
			users: "=",
			getUsers: "&"
		},

		controller:
		function ($scope, $mdMedia, $mdDialog) {
            "ngInject";
			console.log("$scope.products", $scope.products);
            $scope.editUser = function(id, user) {
                    $mdDialog.show({
                    controller: "sharedComponentsAddEditUserController",
                      templateUrl: 'shared/components/addEditUser/addEditUser.html',
                      clickOutsideToClose:true,
					  openFrom: id,
					  closeTo: id,
                      resolve: {
                          user: (_) => {
                              return _.cloneDeep(user);
                          }
                      }
                    })
                    .then( () => {
						$scope.getUsers();
                  }, () => {

                    });

                    $scope.$watch(function() {
                      return $mdMedia('xs') || $mdMedia('sm');
                    }, function(wantsFullScreen) {
                      $scope.customFullscreen = (wantsFullScreen === true);
                    });
            };
		}
	};
};
