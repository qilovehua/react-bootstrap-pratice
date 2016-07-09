'use strict';

import {fetchFromServer} from '../common/server';

const urlBase = '/api';

export function getTopicList(params, success, failed) {
    console.log('topic list', urlBase);
    fetchFromServer(`${urlBase}/topic/list`, 'GET', params, success, failed);
};