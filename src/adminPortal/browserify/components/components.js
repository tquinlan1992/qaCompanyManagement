module.exports = app => {
        require("./account/app")(app);
        require("./company/app")(app);
        require("./createCompany/app")(app);
        require("./stores/app")(app);
        require("./store/app")(app);
        require("./locations/app")(app);
        require("./login/app")(app);
        require("./products/app")(app);
        require("./sidenav/app")(app);
        require("./users/app")(app);
};
