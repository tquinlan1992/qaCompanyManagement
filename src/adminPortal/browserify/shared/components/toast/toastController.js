module.exports = ($scope, $mdToast, toastText) => {

    console.log("toastText", toastText);
    $scope.toastText = toastText;

    $scope.closeToast = function() {
        $mdToast.hide();
    };
};
