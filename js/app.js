/*Hello World!*/

import React from 'react'
import {Link, History} from 'react-router'

import {Nav, Navbar, NavItem, MenuItem, NavDropdown, Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel, Glyphicon} from 'react-bootstrap';

import _ from 'lodash';

import {login, logout, loginGithub} from './api/password';
import cookie from 'react-cookie';

const App = React.createClass({

    mixins: [History],

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
            cookie.save('id', result.id);
            this.setState({
                token: result.token,
                show: false
            }, ()=>{
                this.history.push('/');
            });
        }, (err)=> {
            console.log('error: ', err);
        })
    },

    loginByGithub(){
        loginGithub((result)=>{
            console.log('===', result);
        }, ()=>{
            alert('failed');
        });
    },

    logout(){
        cookie.remove('token');
        logout({});
        this.setState({
            token: '',
            password: ''
        }, ()=>{
            this.history.push('/');
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
                            <NavItem eventKey={1}><Link to="/topic" style={{color: '#fff'}}>Topic</Link></NavItem>
                        </Nav>
                        {
                            this.state.token ? (
                                <Nav pullRight>
                                    <NavItem><Link to="/profile" style={{color: '#fff'}}><Glyphicon glyph="setting"/> 设置</Link></NavItem>
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
                        <Button onClick={this.loginByGithub}>Gibhub登陆</Button>
                        <Button onClick={()=>{this.modalShow(false)}}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.login}>Login</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

export default App;


