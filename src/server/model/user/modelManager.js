"use strict";
const _ = require("lodash");
const User = require("./userSchema");

class UserModel {
    constructor(query, data) {
        this.query = query;
        this.data = data;
    }

    putUser(done) {
        const newUser = this.data.newUser;
        User.create(newUser, done);
    }

    postUser(done) {
        const userId = this.query.userId;
        const newUser = this.data.newUser;
        User.findOne({_id: userId}, (err, user) => {
            _.assign(user, newUser);
            user.save((err, result) => {
                if (result) {
                    done(err, user);
                } else {
                    done(err, null);
                }
            });
        });
    }

    getUsersByCompanyId(done) {
        const companyId = this.query.companyId;
        User.find({companyId: companyId}, done);
    }

    getUserById(done) {
        const userId = this.query.userId;
        User.findOne({_id: userId}, done);
    }

    verifyUser(done) {
        const email = this.query.email;
        const password = this.query.password;
        const companyId = this.query.companyId;
        User.findOne({email: email, password: password, companyId: companyId}, done);
    }

}

module.exports = _.rest(rest => {
    return new UserModel(...rest);
});
