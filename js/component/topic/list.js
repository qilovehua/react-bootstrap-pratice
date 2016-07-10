import React from 'react';

import _ from 'lodash';

import Cell from './cell';

import {getTopicList, deleteTopic} from '../../api/topic';

var TopicList = React.createClass({

    getInitialState(){
        console.log('topic list getInitialState');
        return {
            topicList: []
        }
    },

    componentWillMount(){
        console.log('topic list componentWillMount');
        getTopicList({}, (result)=>{
            this.setState({
                topicList: result.list
            });
        });
    },

    deleteTopicFun(topicId){
        deleteTopic(topicId, ()=>{
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
                <h3>TopicList</h3>
                {list.length > 0 ? list:<p>暂无数据</p>}
            </div>
        );
    }
});

export default TopicList;