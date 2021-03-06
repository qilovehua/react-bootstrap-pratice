'use strict';

import 'whatwg-fetch';
import _ from 'lodash';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}

export function fetchFromServer(url, method, params, success, failed) {
    console.log('method: ', method, 'url: ', url);
    var myRequest = {};
    myRequest.url = url;
    if (method == 'POST' || method == 'DELETE'){
        myRequest = {
            ...myRequest,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
    }else{
        var query = [];
        var keys = _.keys(params);
        _.map(keys, function (key, index) {
            query.push(key + '=' + params[key]);
        });
        if(query.length){
            myRequest.url += '?' + query.join('&');
        }
    }
    console.log(myRequest.url);
    myRequest.mode = 'cors';
    myRequest.cache = 'default';
    myRequest.credentials = 'include'; //跨域需要携带cookie
    fetch(myRequest.url, myRequest)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(result){
            console.log('fetch ', result);
            if(result.success){
                success && success(result.result);
            }else{
                console.log('fetch error - ', e);
                failed && failed(result);
            }
        }, function (e) {
            console.log('fetch error: ', e);
            failed && failed(e);
        });
};