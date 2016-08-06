module.exports = ($scope, _, sharedComponentsAddEditUserAPI, $state, util, $stateParams, $mdDialog, $mdToast, user) => {
    "ngInject";

    $scope.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""

    };

    $scope.user = user || $scope.user;
    if (user) {
        $scope.user = _.cloneDeep(user);
    }
    let APIMethod = "putUser";
    let args = [];
    if (user) {
        $scope.user = user;
        APIMethod = "postUser";
        args.push(user._id);
    }
    args.push($scope.user);

    $scope.addUser= function() {

            sharedComponentsAddEditUserAPI[APIMethod](...args).success( response => {
                console.log("Added User", response);
                $mdToast.show({
                    controller: 'sharedComponentsToastController',
                    templateUrl: 'shared/components/toast/toast.html',
                    hideDelay: 6000,
                    position: "top right",
                    resolve: {
                        toastText: () => {
                            return "Added new user " + $scope.user.email;
                        }
                    }
                });
                $mdDialog.hide(true);
            });
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
};
