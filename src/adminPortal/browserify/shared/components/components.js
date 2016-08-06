module.exports = app => {
        require("./addEditStore/app")(app);
        require("./addEditProduct/app")(app);
        require("./addEditUser/app")(app);
        require("./toast/app")(app);
};
