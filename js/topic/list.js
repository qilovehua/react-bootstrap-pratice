import React from 'react';

var TopicList = React.createClass({

    getInitialState(){
        console.log('topic list getInitialState');
        return {
            topicList: []
        }
    },

    componentWillMount(){
        console.log('topic list componentWillMount');
    },

    render(){
        console.log('hello render');
        return (
            <div>Hello TopicList!!!</div>
        );
    }
});

export default TopicList;