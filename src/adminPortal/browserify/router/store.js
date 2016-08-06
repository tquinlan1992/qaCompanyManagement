const _ = require("lodash");

module.exports = (parentState) => {
    const childState = ".store";
    const childUrl = "/stores";
    return _.concat([
        {
            state: parentState + childState,
            abstract: true,
            url: childUrl,
            template: "<div ui-view class='uiViewFadeIn'></div>"
        },
        {
            state: parentState + childState + ".stores",
            url: "",
            views: {
                '': {
                    templateUrl: 'components/stores/stores.html',
                    controller: 'componentsStoresController'
                }
            }
        },
        {
            state: parentState + childState + ".store",
            url: "/:storeName",
            views: {
                '': {
                    templateUrl: 'components/store/store.html',
                    controller: "componentsStoreStoreController"
                }
            }
        }
    ]);
};
