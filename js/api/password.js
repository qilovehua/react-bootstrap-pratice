'use strict';

import {fetchFromServer} from '../common/server';

const urlBase = '/api';

export function login(params, success, failed) {
    console.log('login', urlBase);
    fetchFromServer(`${urlBase}/login`, 'POST', params, success, failed);
};