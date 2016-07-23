'use strict';

import {fetchFromServer} from '../common/server';

const urlBase = '/api';

exports.getUser = function(params, success, failed) {
    console.log('user detail', urlBase);
    fetchFromServer(`${urlBase}/user`, 'GET', params, success, failed);
};