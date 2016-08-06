module.exports = ($scope, _, sharedComponentsAddEditStoreAPI, $state, util, $mdDialog, $mdToast, store) => {
    "ngInject";
    $scope.store = _.clone(store) || {
        name: "",
        address: {
            street: "",
            city: "",
            state: ""
        }
    };

    $scope.submitAttempted = false;

    $scope.addStore = function() {
        console.log($scope.store);
        let method = "putStore";
        let args = [$scope.store];
        if (store) {
            method = "postStore";
            args.push(store._id);
        }
            sharedComponentsAddEditStoreAPI[method](...args).success(function(response) {
                console.log("Created Store", response);
                $mdToast.show({
                    controller: 'sharedComponentsToastController',
                    templateUrl: 'shared/components/toast/toast.html',
                    hideDelay: 6000,
                    position: "top right",
                    resolve: {
                        toastText: () => {
                            return "Added new Store: " + $scope.store.name;
                        }
                    }
                });
                let mdDialogResponse = false;
                if (store && store.name === $scope.store.name) {
                    console.log("gothere", store, $scope.store.name);
                    mdDialogResponse = true;
                }
                $mdDialog.hide(mdDialogResponse);
                $state.go("app.user.store.store", {storeName: response.name});
            });
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
};
