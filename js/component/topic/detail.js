import React from 'react';

import topic from '../../api/topic';

import Cell from './cell';

var Detail = React.createClass({

    topicId: 0,
    getInitialState(){
        this.topicId = this.props.params.topicId;
        return {
            detail: undefined
        }
    },

    componentWillMount(){
        this.topicId && topic.getTopicDetail(this.topicId, (result)=>{
            console.log('detail topic', result);
            this.setState({
                detail: result.topic
            });
        });
    },
    
    render() {
        return (
            <div>
                <p>Topicdetail</p>
                {
                    this.state.detail ? <Cell detail={this.state.detail} fromList={false}/> : undefined
                }
            </div>
        )
    }
});

export default Detail;