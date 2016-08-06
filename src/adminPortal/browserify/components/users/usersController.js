module.exports = ($scope, componentsUsersAPI, $mdMedia, $mdDialog) => {
    "ngInject";

    $scope.users = [];

    function getUsers() {
        componentsUsersAPI.getUsers().success( response => {
            $scope.users = response;
        });
    }

    getUsers();

    $scope.getUsers = getUsers;

    $scope.addUser = function(id) {

            $mdDialog.show({
              controller: "sharedComponentsAddEditUserController",
              templateUrl: 'shared/components/addEditUser/addEditUser.html',
              clickOutsideToClose:true,
              openFrom: id,
              closeTo: id,
              resolve: {
                  user: () => {
                      return;
                  }
              }
            })
            .then( () => {
              getUsers();
          }, () => {

            });



            $scope.$watch(function() {
              return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
              $scope.customFullscreen = (wantsFullScreen === true);
            });
    };
};
