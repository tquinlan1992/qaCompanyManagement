module.exports = function() {

	return {

		restrict: "E",
		templateUrl: "shared/directives/tomCheckboxes/tom-checkboxes.html",
		scope: {
			data: "=",
            checkedBoxes: "="
		},

		controller:
		($scope, _) => {
            $scope.isChecked = function(item) {
                if (item === "all") {
                    return $scope.data.items.length && $scope.data.items.length === $scope.checkedBoxes.length;
                }
                return _.includes($scope.checkedBoxes, item[$scope.data.id]);
            };

            $scope.toggleAll = function () {
                if ($scope.isChecked("all")) {
                    $scope.checkedBoxes = [];
                    return;
                }
                $scope.checkedBoxes = _.cloneDeep(_.map($scope.data.items, $scope.data.id));
            };



            $scope.checkClick = function(item) {
                if (!$scope.isChecked(item)) {
                    $scope.checkedBoxes.push(item[$scope.data.id]);
                } else {
                    _.pull($scope.checkedBoxes, item[$scope.data.id]);
                }
            };
        }
	};
};
