'use strict';

import 'whatwg-fetch';
import _ from 'lodash';

export function fetchFromServer(url, method, params, success, failed) {
    console.log('method: ', method, 'url: ', url);
    var myRequest = {};
    if (method == 'POST' || method == 'DELETE'){
        myRequest = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
    }else{
        myRequest.url = url;
        var query = [];
        var keys = _.keys(params);
        _.map(keys, function (key, index) {
            query.push(key + '=' + params[key]);
        });
        if(query.length){
            myRequest.url += '?' + query.join('&');
        }
    }
    fetch(url, myRequest).then(function (res) {
        return res.json();
    }).then(function(result){
        console.log('fetch ', result);
        if(result.success){
            success && success(result.result);
        }else{
            failed && failed(result);
        }
    }, function (e) {
        failed && failed(e);
    });
};