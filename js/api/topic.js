'use strict';

import {fetchFromServer} from '../common/server';

const urlBase = '/api';

exports.getTopicList = function(params, success, failed) {
    console.log('topic list', urlBase);
    fetchFromServer(`${urlBase}/topic/list`, 'GET', params, success, failed);
};

exports.getTopicDetail = function(topicId, success, failed) {
    fetchFromServer(`${urlBase}/topic/item/${topicId}`, 'GET', {}, success, failed);
};

exports.deleteTopic = function(topicId, success, failed) {
    fetchFromServer(`${urlBase}/topic/item/${topicId}`, 'DELETE', {}, success, failed);
};

exports.newTopic = function(params, success, failed){
    fetchFromServer(`${urlBase}/topic/add`, 'POST', params, (topic)=>{
        console.log('new topic', topic);
        success && success(topic.topic._id);
    }, failed);
};

exports.editTopic = function (topicId, params, success, failed) {
    fetchFromServer(`${urlBase}/topic/item/${topicId}`, 'POST', params, (topic)=>{
        console.log('edit topic', topic);
        success && success(topic.topic._id);
    }, failed);
};