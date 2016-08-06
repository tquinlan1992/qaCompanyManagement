const serverConstants = require("../constants/server");

module.exports = (subdomain) => {
    return 'http://' + subdomain + '.' + serverConstants.DOMAIN + ':' + serverConstants.ADMIN_PORTAL_PORT;
};
