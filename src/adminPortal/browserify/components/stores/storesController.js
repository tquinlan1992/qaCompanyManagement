module.exports = ($scope, componentsStoresAPI, $mdMedia, $mdDialog) => {
    "ngInject";
    $scope.stores = [
    ];

    function getStores(callback) {
        componentsStoresAPI.getStores(true).success(function(response) {
            $scope.stores = response;
            callback();
        });
    }
    getStores(() => {});

    $scope.addStore = (id) => {

        $mdDialog.show({
            controller: "sharedComponentsAddEditStoreController",
            templateUrl: 'shared/components/addEditStore/addEditStore.html',
            clickOutsideToClose:true,
            openFrom: id,
            closeTo: id,
            resolve: {
                store: () => {
                    return;
                }
            }
        })

        .then( () => {

        }, () => {

        });



            $scope.$watch(function() {
              return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
              $scope.customFullscreen = (wantsFullScreen === true);
            });
    };
};
