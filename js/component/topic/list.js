import React from 'react';

import _ from 'lodash';

import Cell from './cell';

import topic from '../../api/topic';

import  {Link} from 'react-router';
import {Button} from 'react-bootstrap/lib/';

var TopicList = React.createClass({

    getInitialState(){
        console.log('topic list getInitialState');
        return {
            topicList: []
        }
    },

    componentWillMount(){
        console.log('topic list componentWillMount');
        topic.getTopicList({}, (result)=> {
            this.setState({
                topicList: result.list
            });
        });
    },

    deleteTopicFun(topicId){
        topic.deleteTopic(topicId, ()=> {
            var {topicList} = this.state;
            console.log('before ', topicList);

            _.remove(topicList, function (topic) {
                return topic._id == topicId;
            });
            console.log('after ', topicList);
            this.setState({
                topicList
            });
        });
    },

    render(){
        var that = this;
        var list = _.map(this.state.topicList, function (topic, index) {
            return (
                <Cell detail={topic} key={index} deleteTopic={(id)=>that.deleteTopicFun(id)}/>
            )
        });
        return (
            <div>
                <h3>TopicList <Link to="topic/new"><Button bsStyle="primary">新建帖子</Button></Link></h3>
                {list.length > 0 ? list : <p>暂无数据</p>}
            </div>
        );
    }
});

export default TopicList;