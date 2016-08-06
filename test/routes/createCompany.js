"use strict";
const companyMongoose = require("../../src/server/model/company/companySchema");
const userMongoose = require("../../src/server/model/user/userSchema");
const mongoose = require("mongoose");

module.exports = {
    oneUser: callback => {
        let company = {
            subdomain: "subdomain",
            users: [{
                firstName: "firstName",
                lastName: "lastName",
                email: "email@email.com",
                password: "password"
            }],
            products: [{
                name: "menuItemName",
                description: "menuItemDescription",
                kind: "menuItemKind"
            }]
        };
        companyMongoose.create(company, (err, result) => {
            callback(err, result);
        });
    },
    tenUsers: callback => {
        let usersReq = [];
        let companiesReq = [];
        let i = 10;
        while (i) {
            let companyId = mongoose.Types.ObjectId();
            usersReq.push({
                firstName: "firstName" + i,
                lastName: "lastName" + i,
                email: "email@email.com" + i,
                password: "password" + i,
                companyId: companyId
            });
            companiesReq.push(
                {
                    subdomain: "subdomain" + i,
                    _id: companyId
                }
            );
            i--;
        }
        companyMongoose.create(companiesReq, (err, companies) => {
            userMongoose.create(usersReq, (err, users) => {
                callback(err, companies, users);
            });
        });
    }
};
