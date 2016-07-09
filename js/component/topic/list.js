import React from 'react';

import _ from 'lodash';

import Cell from './cell';

import {getTopicList} from '../../api/topic';

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
            console.log('hahha', result);
            this.setState({
                topicList: result.list
            });
        });
    },

    render(){
        console.log('hello render');
        var list = _.map(this.state.topicList, function (topic, index) {
            return (
                <Cell detail={topic} key={index}/>
            )
        });
        return (
            <div>
                <h3>TopicList</h3>
                {list}
            </div>
        );
    }
});

export default TopicList;