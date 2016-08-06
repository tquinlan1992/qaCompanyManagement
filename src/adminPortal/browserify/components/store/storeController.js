module.exports = ($scope, $stateParams, componentsStoreAPI, $state, $window, _, $mdDialog, $mdMedia) => {
    "ngInject";
    if ($stateParams.storeName === "" || _.isUndefined($stateParams.storeName)) {
        $state.go("app.store.stores");
    }
    $scope.store = {};
    function getStore() {
        componentsStoreAPI.getStore($stateParams.storeName).success(function(response) {
            if (response) {
                $scope.store = response;
                getStoreProducts();
                console.log(response);
            } else {
                alert("no store with name of "+ $stateParams.storeName); // jshint ignore:line
            }
        });
    }

    function getStoreProducts() {
        componentsStoreAPI.getStoreProducts($scope.store._id).success(function(response) {
            $scope.store.menu = response;
            console.log(response);
        });
    }

    $scope.getStore = getStore;
    getStore();

    $scope.editStore = (id) => {

        $mdDialog.show({
            controller: "sharedComponentsAddEditStoreController",
            templateUrl: 'shared/components/addEditStore/addEditStore.html',
            clickOutsideToClose:true,
            openFrom: id,
            closeTo: id,
            resolve: {
                store: () => {
                    return _.cloneDeep($scope.store);
                }
            }
        })

        .then( reload => {
            if (reload) {
                getStore();
            }

        }, () => {

        });

        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

};
