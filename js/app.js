/*Hello World!*/

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router'

import {Nav, Navbar, NavItem, MenuItem, NavDropdown, Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel, Glyphicon} from 'react-bootstrap';

import _ from 'lodash';

import {login, logout} from './api/password';
import cookie from 'react-cookie';

import Login from './component/login';
import World from './world';
import TopicList from './component/topic/list';
import TopicDetail from './component/topic/detail';

const App = React.createClass({

    getInitialState(){
        return {
            username: '',
            password: '',
            token: '',
            show: false, // 登陆框显示与否
        }
    },

    componentWillMount(){
        this.getUserInfo();
    },

    getUserInfo(){
        var username = cookie.load('username');
        var token = cookie.load('token');
        var params = {};
        username && (params.username = username);
        username && token && (params.token = token);
        _.size(params) && this.setState(params);
    },

    login(){
        var {username, password} = this.state;
        if(!username || !password){
            return;
        }
        login({name: username, password}, (result)=> {
            console.log('login', result);
            cookie.save('token', result.token);
            cookie.save('username', username);
            this.setState({
                token: result.token,
                show: false
            });
        }, (err)=> {
            console.log('error: ', err);
        })
    },

    logout(){
        cookie.remove('token');
        logout({});
        this.setState({
            token: '',
            password: ''
        });
    },

    modalShow(show){
        this.setState({
            show
        });
    },

    handleUser(e){
        var username = e.target.value;
        this.setState({
            username
        });
    },

    handlePass(e){
        var password = e.target.value;
        this.setState({
            password
        });
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
                            <NavItem eventKey={1}><Link to="/topic">Topic</Link></NavItem>
                        </Nav>
                        {
                            this.state.token ? (
                                <Nav pullRight>
                                    <NavItem><Glyphicon glyph="user"/> {this.state.username}</NavItem>
                                    <NavItem eventKey={2} href="#" onClick={this.logout}>Logout</NavItem>
                                </Nav>
                            ):(
                                <Nav pullRight>
                                    <NavItem eventKey={1} onClick={()=>this.modalShow(true)}>Login</NavItem>
                                </Nav>
                            )
                        }
                    </Navbar.Collapse>
                </Navbar>
                <div style={{margin: '50px 100px 0 100px'}}>
                    {this.props.children}
                </div>

                <Modal show={this.state.show} onHide={()=>{this.modalShow(false)}}>
                    <Modal.Header>
                        <Modal.Title>Welcome, please login...</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form horizontal style={{margin: '0 auto'}}>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} md={2} mdOffset={2}>
                                    Username
                                </Col>
                                <Col md={5}>
                                    <FormControl placeholder="Username" value={this.state.username} onChange={this.handleUser}/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} md={2} mdOffset={2}>
                                    Password
                                </Col>
                                <Col md={5}>
                                    <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handlePass}/>
                                </Col>
                            </FormGroup>

                            {/*<FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit">
                                        Sign in
                                    </Button>
                                </Col>
                            </FormGroup>
                            */}
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={()=>{this.modalShow(false)}}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.login}>Login</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

// 配置路由，并将路由注入到id为react的DOM元素中
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="login" component={Login}/>
            <Route path="topic" component={TopicList}/>
            <Route path="topic/item/:topicId" component={TopicDetail}/>
        </Route>
    </Router>
), document.getElementById('react'));

