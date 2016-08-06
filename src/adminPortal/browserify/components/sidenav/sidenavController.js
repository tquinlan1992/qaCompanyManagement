module.exports = function($scope, $state, _, componentsSidenavAPI) {
    "ngInject";

    function expandBasedOnActive(items) {
        _.forEach(items, menuItem => {
            if (menuItem.children) {
                _.forEach(menuItem.children, child => {
                    if ($state.includes(child.state)) {
                        menuItem.expand = true;
                        return false;
                    }
                });
            }
            if (menuItem.expand) {
                return false;
            }
        });
    }

    $scope.logout = () => {
        componentsSidenavAPI.logout().success( () => {
             $state.go('credentials.login');
        }).error( () => {
        });
    };

    componentsSidenavAPI.getCompanyInfo().success( response => {
        $scope.user = response;
    }).error( () => {
    });


    $scope.menuItems = [
            {text: "Stores", state: "app.user.store.stores"},
            {text: "Products", state: "app.user.products"},
            {text: "Locations", state: "app.user.locations"},
            {text: "Account", state: "app.user.account"},
            {text: "Users", state: "app.user.users"},
            {text: "Company", state: "app.user.company"}
    ];
    expandBasedOnActive($scope.menuItems);
};
