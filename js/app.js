/*Hello World!*/

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router'

import {Nav, Navbar, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

import {login} from './api/password';

import Hello from './hello';
import World from './world';
import TopicList from './topic/list';

const App = React.createClass({

    getInitialState(){
        console.log('login getInitialState');
        return {
            name: ''
        }
    },

    componentWillMount(){
        this.login();
    },

    login(){
        login({name: 'hello', password: '123456'}, (result)=>{
            console.log('login', result);
        }, (err)=>{
            console.log('error: ', err);
        })
    },

    render(){
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">React-Bootstrap</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="/hello">Link</NavItem>
                            <NavItem eventKey={2} href="/world">Link</NavItem>
                            <NavItem eventKey={3} href="/topic">Topic</NavItem>
                            // <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            //     <MenuItem eventKey={3.1}>Action</MenuItem>
                            //     <MenuItem eventKey={3.2}>Another action</MenuItem>
                            //     <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            //     <MenuItem divider />
                            //     <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            // </NavDropdown>
                        </Nav>
                        {
                            this.state.name?(
                                <Nav pullRight>
                                    <span>{this.state.name}</span>
                                    <NavItem eventKey={2} href="#">Logout</NavItem>
                                </Nav>
                            ):(
                                <Nav pullRight>
                                    <NavItem eventKey={1} href="#">Login</NavItem>
                                </Nav>
                            )
                        }
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

// 配置路由，并将路由注入到id为react的DOM元素中
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Hello}/>
            <Route path="hello" component={Hello}/>
            <Route path="world" component={World}/>
            <Route path="topic" component={TopicList}>
                <Route path="detail" component={World}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('react'));

