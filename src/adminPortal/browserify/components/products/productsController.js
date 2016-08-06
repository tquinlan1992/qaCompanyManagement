module.exports = ($scope, $stateParams, componentsProductsAPI, $state, $window, _, $mdDialog, $mdMedia) => {
    "ngInject";

    $scope.products = [];
    $scope.productKinds = [];

    function getProducts() {
        componentsProductsAPI.getProducts().success(function(response) {
            if (response) {
                $scope.products = response;
            } else {
                alert("no product with name of "+ $stateParams.storeName); // jshint ignore:line
            }
        });
    }


    $scope.getProducts = getProducts;
    getProducts();

    $scope.goBack = () => {
        $window.history.back();
    };


    $scope.addEditProduct = function(id) {

            $mdDialog.show({
              controller: "sharedComponentsAddEditProductController",
              templateUrl: 'shared/components/addEditProduct/addEditProduct.html',
              clickOutsideToClose:true,
              openFrom: id,
              closeTo: id,
              resolve: {
                  product: () => {
                      return;
                  }
              }
            })
            .then( () => {
              getProducts();
          }, () => {

            });



            $scope.$watch(function() {
              return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
              $scope.customFullscreen = (wantsFullScreen === true);
            });
    };
};
