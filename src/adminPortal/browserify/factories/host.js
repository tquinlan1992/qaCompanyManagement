

module.exports = ($location) => {
    "ngInject";

    let locationHost = $location.host();
    const indexOfFirstDot = locationHost.indexOf('.');
    const splitHost = locationHost.split('.');
    let host = "";
    let subdomain;
    if (indexOfFirstDot < 0 || splitHost[1] === "com") {
        host = splitHost[0];
        subdomain = null;
    }
    else {
        host = splitHost[1];
        subdomain = splitHost[0];
    }
    return {host: host, subdomain: subdomain};
};
