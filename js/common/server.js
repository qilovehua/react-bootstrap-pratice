'use strict';

import 'whatwg-fetch';

export function fetchFromServer(url, method, params, success, failed) {
    console.log(url, method, params)
    fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(function (res) {
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