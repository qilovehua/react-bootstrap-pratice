'use strict';

import React from 'react';
import cookie from 'react-cookie';
import {Link, History} from 'react-router'

import user from '../api/user';

const Profile = React.createClass({

    mixins: [History],

    getInitialState(){
        return {
            email: '',
            nickname: '',
            about: ''
        }
    },

    componentWillMount(){
        var _id = cookie.get('id');
        user.getUser({_id}, (result)=>{
            var {email, nickname, about} = result;
            this.setState({
                email,
                nickname,
                about
            });
        });
    },

    saveProfile(){
        var _id = cookie.get('id');
        var {email, nickname, about} = this.state;
        user.updateUser({_id, email, nickname, about}, (result)=>{
            alert('update success');
            this.goBack();
        }, ()=>{
            alert(`fail: $(result)`);
        });
    },

    handleInput(e, name){
        let param = {};
        param[name] = e.target.value;
        this.setState(param);
    },

    goBack(){
        this.history.back();
    },

    render(){
        
        return (
            <Form horizontal style={{margin: '0 auto'}}>
                <p>Update {this.state.username}'s profile</p>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} md={2} mdOffset={2}>
                        Email
                    </Col>
                    <Col md={5}>
                        <FormControl placeholder="email" value={this.state.email} onChange={(e)=>this.handleInput(e, 'email')}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalNickname">
                    <Col componentClass={ControlLabel} md={2} mdOffset={2}>
                        Nickname
                    </Col>
                    <Col md={5}>
                        <FormControl placeholder="nickname" value={this.state.nickname} onChange={(e)=>this.handleInput(e, 'nickname')}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalAbout">
                    <Col componentClass={ControlLabel} md={2} mdOffset={2}>
                        About
                    </Col>
                    <Col md={5}>
                        <FormControl placeholder="about" value={this.state.about} onChange={(e)=>this.handleInput(e, 'about')}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} md={2}>
                        <Button bsStyle="primary" onClick={this.saveProfile}> Save </Button>
                    </Col>
                    <Col md={2}>
                        <Button  bsStyle="default" onClick={this.goBack}> Cancel </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
});

export default Profile;