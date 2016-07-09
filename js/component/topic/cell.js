import React from 'react';

import _ from 'lodash';

import {Well, Media, Label} from 'react-bootstrap';
import {Link} from 'react-router';

var Cell = React.createClass({
    render() {
        console.log('hahah');
        var {detail} = this.props;
        console.log('DETAIL', detail);
        var tagList = (
            _.map(detail.tags, function (tag) {
                return <Label bsStyle="info" style={{marginRight: '5px'}}>{tag}</Label>
            })
        );
        return (
            <div>
                <Well>
                    <Media.List>
                        <Media.ListItem>
                            <Media.Left>
                                <img width={64} height={64} src="/static/image/react.jpg" alt="react"/>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading><Link to={"/topic/item/"+detail._id}>{detail.title}</Link></Media.Heading>
                                <p>{detail.content}</p>
                                <p>{detail.createdAt}</p>
                                <br/>
                                <div>
                                {tagList}
                                </div>
                            </Media.Body>
                        </Media.ListItem>
                    </Media.List>
                </Well>
            </div>
        )
    }
});

export default Cell;