const serverConstants = require("../../envVariables/server");

module.exports = () => {
    return {
            API_SERVER: serverConstants.API,
            STORE: "store/",
            COMPANIES: "companies/",
            PRODUCTS: "products/",
            USERS: "users/"
    };
};
