const angular = require("angular");
const _ = require("lodash");

const app = angular.module('util', []);

class Util {

    convertModel(object) {
        _.forEach(object, (value, key) => {
            if (!_.isUndefined(value.model)) {
                if(_.isString(value.model) && value.model === "") {
                    delete value.model;
                }
                object[key] = value.model;
            } else {
                this.convertModel(value);
            }
        });
    }

    validateEmpty(inputArray) {
        let valid = true;
        _.forEach(inputArray, input => {
            if (input.errors) {
                if (!_.get(input, "model.length")) {
                    valid = false;
                    input.errors.required = true;
                } else {
                    input.errors.required = false;
                }
            }
        });
        return valid;
    }

    watchValidateEmpty (obj) {
        _.forEach(obj.models, model => {
            obj.$scope.$watch(
                model,
                newValue => {
                    this.validateEmpty([newValue]);
                },
                true
            );
        });
    }

}


app.factory('util', () => {
    return new Util();
});

module.exports = 'util';
