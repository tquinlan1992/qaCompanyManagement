"use strict";
const _ = require("lodash");
const Company = require("./companySchema");

class CompanyModel {

    constructor(query, data) {
        this.query = query;
        this.data = data;
    }

    putCompany(done) {
        const newCompany = this.data.newCompany;
        Company.create(newCompany, done);
    }

    postCompany(done) {
        const companyId = this.query.companyId;
        const newCompany = this.data.newCompany;

        Company.findOne({_id: companyId}, (err, company) => {
            _.assign(company, newCompany);
            company.save((err, result) => {
                if (result) {
                    done(err, _.assign({},
                        {
                            companyId: company._id,
                            subdomain: company.subdomain
                        }
                    ));
                } else {
                    done(err, null);
                }
            });
        });
    }

    getCompany(done) {
        const query = this.query.query;
        const selectProperties = this.query.selectProperties;
        Company.findOne(query, selectProperties, done);
    }
}

module.exports = _.rest(rest => {
    return new CompanyModel(...rest);
});
