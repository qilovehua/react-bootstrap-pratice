/*Hello World!*/

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory, Link, History} from 'react-router'

import App from './app';
import Login from './component/login';
import TopicList from './component/topic/list';
import TopicDetail from './component/topic/detail';
import TopicNew from './component/topic/new';

// 配置路由，并将路由注入到id为react的DOM元素中
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/topic" component={TopicList}/>
            <Route path="/topic/item/:topicId" component={TopicDetail}/>
            <Route path="/topic/new(/:topicId)" component={TopicNew}/>
        </Route>
    </Router>
), document.getElementById('react'));