module.exports = function() {

	return {

		restrict: "E",
		templateUrl: "shared/directives/productTable/product-table.html",
		scope: {
			products: "=",
			getProducts: "&",
		},

		controller:
		function ($scope, $mdMedia, $mdDialog) {
            "ngInject";
            $scope.editProduct = function(id, product) {
                    $mdDialog.show({
                    controller: "sharedComponentsAddEditProductController",
                      templateUrl: 'shared/components/addEditProduct/addEditProduct.html',
                      clickOutsideToClose:true,
					  openFrom: id,
					  closeTo: id,
                      resolve: {
                          product: (_) => {
                              return _.cloneDeep(product);
                          }
                      }
                    })
                    .then( () => {
						$scope.getProducts();
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
