'use strict';

import React from 'react'
import cookie from 'react-cookie';

const Login = React.createClass({

    render(){
        var msg = '';
        var username = cookie.load('username');
        var token = cookie.load('token');
        if(username){
            msg += 'Welcome ' + username + ', ';
        }
        if (token){
            msg += 'you has login ...';
        }else{
            msg += 'please login first ...';
        }
        return (
            <div>
                {msg}
            </div>
        )
    }
});

export default Login;