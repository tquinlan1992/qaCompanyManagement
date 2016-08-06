const _ = require("lodash");

module.exports = ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) => {
    "ngInject";
    $urlRouterProvider.otherwise("/stores");
    const parentState = "app";
    const parentUrl = "";
    const states = _.concat(
        [
            {
                state: 'app',
                url: '',
                views: {
                    '': {
                        template: "<div ui-view class='uiViewFadeIn'></div>",
                        resolve: {
                            loginStatus: ($state, routerUsersAPI) => {
                                return routerUsersAPI.getLoginStatus().success( () => {
                                    return true;
                                }).error( () => {
                                    return $state.go("credentials.login");
                                });
                            }
                        }
                    },
                    'sidenav': {
                        templateUrl: 'components/sidenav/sidenav.html',
                        controller: 'componentsSidenavController'
                    }
                }
            },
            {
                state: "credentials",
                abstract: true,
                url: "",
                templateUrl: "components/credentials/credentials.html"
            },
            {
                state: 'credentials.login',
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'components/login/login.html',
                        controller: 'componentsLoginController'
                    },
                },
                resolve: {
                    loginStatus: ($state, routerUsersAPI) => {
                        routerUsersAPI.getLoginStatus().success( result => {
                            $state.go("app.users.store.stores", {companyId: result._id});
                        }).error( () => {
                            return;
                        });
                    }
                }
            },
            {
                state: 'credentials.createCompany',
                url: '/createCompany',
                views: {
                    '': {
                        templateUrl: 'components/createCompany/createCompany.html',
                        controller: 'componentsCreateCompanyController'
                    },
                },
                resolve: {
                    loginStatus: ($state, routerUsersAPI) => {
                        routerUsersAPI.getLoginStatus().success( result => {
                            $state.go("app.users.store.stores", {companyId: result._id});
                        }).error( () => {
                            return;
                        });
                    }
                }
            }
        ],
        require("./user")(parentState, parentUrl)
    );
    _.forEach(states, state => {
        $stateProvider.state(state.state, _.omit(state, "state"));
    });

    $locationProvider.html5Mode(true);
};
