module.exports = ($scope, _, $state, util, $stateParams, $mdDialog, $mdToast, product, sharedComponentsAddEditProductAPI) => {
    "ngInject";

    $scope.product = {
        name: "",
        description: "",
        kind: "",
        stores: []
    };

    $scope.productKinds = [];

    function getProductKinds() {
        sharedComponentsAddEditProductAPI.getProductKinds().success(response => {
            $scope.productKinds = response;
        });
    }

    getProductKinds();

    $scope.newKindDisabled = false;
    if (product) {
        $scope.product = _.cloneDeep(product);
        $scope.newKindDisabled = !!product.kind;
    }

    $scope.kind = {newKindChecked: false};

    sharedComponentsAddEditProductAPI.getStores(false).success(function(response) {
        $scope.checkboxStores = response;
    });

    $scope.addEditProduct = function() {
            let route = "putProduct";
            let args = [];
            if (product) {
                route = "postProduct";
                args.push(_.get(product, "_id"));

            }
            args.push($scope.product);
            sharedComponentsAddEditProductAPI[route](...args).success(function(response) {
                console.log("Added product", response);
                $mdToast.show({
                    controller: 'sharedComponentsToastController',
                    templateUrl: 'shared/components/toast/toast.html',
                    hideDelay: 6000,
                    position: "top right",
                    resolve: {
                        toastText: () => {
                            return "Added new product: " + $scope.product.name;
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
