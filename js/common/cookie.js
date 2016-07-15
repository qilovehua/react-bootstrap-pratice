import cookie from 'react-cookie';
import _ from 'lodash';

exports.get = function (name) {
    return cookie.load(name);
};

exports.set = function (params) {
    _.mapKeys(params, function (value, key) {
        cookie.save(key, value);
    });
};