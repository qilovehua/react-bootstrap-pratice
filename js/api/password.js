'use strict';

import {fetchFromServer} from '../common/server';

const urlBase = '/api';

export function login(params, success, failed) {
    console.log('login', urlBase);
    fetchFromServer(`${urlBase}/login`, 'POST', params, success, failed);
};

export function logout(params, success, failed) {
    console.log('logout', urlBase);
    fetchFromServer(`${urlBase}/logout`, 'POST', params, success, failed);
};

export function loginGithub(success, failed) {
    fetchFromServer(`${urlBase}/auth/github`, 'GET', {}, success, failed);
};