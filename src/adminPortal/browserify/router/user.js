const _ = require("lodash");

module.exports = (parentState, parentUrl) => {
    const childState = ".user";
    const childUrl = "";
    return _.concat([
        {
            state: parentState + childState,
            abstract: true,
            url: parentUrl + childUrl,
            template: "<div ui-view class='uiViewFadeIn'></div>"
        }],
        {
            state: parentState + childState + ".account",
            url: "/account",
            views: {
                '': {
                    templateUrl: 'components/account/account.html',
                    controller: "componentsAccountController"
                }
            }
        },
        {
            state: parentState + childState + ".users",
            url: "/users",
            views: {
                '': {
                    templateUrl: "components/users/users.html",
                    controller: "componentsUsersController"
                }
            }
        },
        {
            state: parentState + childState + ".company",
            url: "/company",
            views: {
                '': {
                    templateUrl: 'components/company/company.html',
                    controller: "componentsCompanyController"
                }
            }
        },
        {
            state: parentState + childState + ".products",
            url: "/products",
            views: {
                '': {
                    templateUrl: 'components/products/products.html',
                    controller: "componentsProductsController"
                }
            }
        },
        {
            state: parentState + childState + ".locations",
            url: "/locations",
            views: {
                '': {
                    templateUrl: "components/locations/locations.html",
                    controller: "componentsLocationsController"
                }
            }
        },
        require("./store")(parentState + childState, childUrl)
    );
};
