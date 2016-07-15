import React from 'react';

import _ from 'lodash';
import cookie from '../../common/cookie'
import {browserHistory} from 'react-router';

import topic from '../../api/topic';

import {Well, Media, Label, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';

var Cell = React.createClass({

    getDefaultProps(){
        return {
            fromList: true
        }
    },

    render() {
        var {detail} = this.props;
        console.log('detail ', detail);
        var tagList = (
            _.map(detail.tags, function (tag) {
                return <Label bsStyle="info" style={{marginRight: '5px'}}>{tag}</Label>
            })
        );
        if(!this.props.fromList){
            var commentList = (
                _.map(detail.comments, function (comment, index) {
                    return <p key={index}>{index + ', '}{comment.content}</p>
                })
            );
        }
        var isSelf = cookie.get('id') == detail.authorId;
        return (
            <div>
                <Well>
                    <Media.List>
                        <Media.ListItem>
                            <Media.Left>
                                <img width={64} height={64} src="/static/image/react.jpg" alt="react"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>
                                    <Row>
                                        <Col md={6}><Link to={"/topic/item/"+detail._id}>{detail.title}</Link></Col>
                                        {
                                            isSelf ?
                                                <Col md={1} xsOffset={5}>
                                                    <Link to={"/topic/new/"+detail._id}><Button
                                                        bsStyle="link"><Glyphicon glyph="edit"/></Button></Link>
                                                    <Button bsStyle="link" onClick={()=>{
                                                                topic.deleteTopic(detail._id, ()=> {
                                                                    browserHistory.push('/topic');
                                                                });
                                                            }}><Glyphicon
                                                        glyph="remove"/></Button>
                                                </Col> : undefined
                                        }
                                    </Row>
                                </Media.Heading>
                                <p>{detail.content}</p>
                                <h6>{detail.createdAt} {detail.comments ? ('---'+ detail.comments.length + ' 评论'): undefined}</h6>
                                <br/>
                                <div>
                                {tagList}
                                </div>
                            </Media.Body>
                        </Media.ListItem>
                    </Media.List>
                    {
                        !this.props.fromList ?
                        <div>
                            <hr style={{height: '3px', color: 'red'}}/>
                            <div>
                                {commentList.length > 0 ? commentList : <p>暂无评论！</p>}
                            </div>
                        </div> : undefined
                    }
                </Well>
            </div>
        )
    }
});

export default Cell;