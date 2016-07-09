'use strict';

import React from 'react'
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router'

import {Nav, Navbar, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

const App = React.createClass({

    getInitialState(){
        return {
            name: ''
        }
    },

    componentWillMount(){
        this.login();
    },

    login(){
        login({name: 'hello', password: '123456'}, (result)=> {
            console.log('login', result);
        }, (err)=> {
            console.log('error: ', err);
        })
    },

    render(){
        return (
            <div>
            </div>
        )
    }
});