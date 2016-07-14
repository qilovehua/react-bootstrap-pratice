'use strict';

import {fetchFromServer} from '../common/server';

const urlBase = '/api';

export function getTopicList(params, success, failed) {
    console.log('topic list', urlBase);
    fetchFromServer(`${urlBase}/topic/list`, 'GET', params, success, failed);
}

export function getTopicDetail(topicId, success, failed) {
    fetchFromServer(`${urlBase}/topic/item/${topicId}`, 'GET', {}, success, failed);
}

export function deleteTopic(topicId, success, failed) {
    fetchFromServer(`${urlBase}/topic/item/${topicId}`, 'DELETE', {}, success, failed);
}

export function newTopic(params, success, failed){
    fetchFromServer(`${urlBase}/topic/add`, 'POST', params, (topic)=>{
        console.log('new topic', topic);
        success && success(topic.topic._id);
    }, failed);
}