import React from 'react';

import _ from 'lodash';
import topic from '../../api/topic';

import {Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap/lib';

var New = React.createClass({

    topicId: 0,
    getInitialState(){
        this.topicId = this.props.params.topicId;
        return {
            title: '',
            content: '',
            tags: ''
        }
    },

    componentWillMount(){
        topic.getTopicDetail(this.topicId, (result)=>{
            console.log('detail topic', result);
            var topic = result.topic;
            topic && this.setState({
                title: topic.title,
                content: topic.content,
                tags: topic.tags.join(',')
            });
        });
    },

    handleInput(e, name){
        let param = {};
        param[name] = e.target.value;
        console.log(param);
        this.setState(param);
    },
    
    post(){
        var {title, content, tags} = this.state;
        if(!title || !content){
            alert('title and content can not be empty');
            return;
        }
        if(this.topicId){
            topic.editTopic(this.topicId, {title, content, tags}, (topicId)=> {
                location = `/topic/item/${topicId}`;
            }, ()=> {
            })
        }else {
            topic.newTopic({title, content, tags}, (topicId)=> {
                location = `/topic/item/${topicId}`;
            }, ()=> {
            })
        }
    },

    render() {
        return (
            <div>
                <h3>New Post</h3>
                <Form horizontal style={{margin: '0 auto'}}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2} mdOffset={2}>
                            Title
                        </Col>
                        <Col md={5}>
                            <FormControl placeholder="Title" value={this.state.title} onChange={(e)=>this.handleInput(e, 'title')}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2} mdOffset={2}>
                            Content
                        </Col>
                        <Col md={5}>
                            <FormControl componentClass="textarea" placeholder="Content" style={{height: '399px'}} value={this.state.content} onChange={(e)=>this.handleInput(e, 'content')}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2} mdOffset={2}>
                            Tag
                        </Col>
                        <Col md={5}>
                            <FormControl placeholder="Tag split by ," value={this.state.tags} onChange={(e)=>this.handleInput(e, 'tags')}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col mdOffset={4} md={3}>
                            <Button bsStyle="primary" onClick={this.post}>
                                Post
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
});

export default New;