"use strict";

module.exports = function IsJsonString(str) {
    let response = {};
    try {
        response = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return response;
};
