'use strict';

import {fetchFromServer} from '../common/server';

const urlBase = '/api';

exports.getUser = function(params, success, failed) {
    console.log('user detail', urlBase, params);
    fetchFromServer(`${urlBase}/user`, 'GET', params, success, failed);
};

exports.updateUser = function(params, success, failed) {
    console.log('user detail', params);
    fetchFromServer(`${urlBase}/user`, 'POST', params, success, failed);
};