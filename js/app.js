/*Hello World!*/

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import Hello from './hello';
import World from './world';

const App = React.createClass({
    render(){
        return (
            <div>
                <h1>React.js Demo</h1>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

// 配置路由，并将路由注入到id为init的DOM元素中
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Hello}/>
            <Route path="hello" component={World}/>
        </Route>
    </Router>
), document.getElementById('react'));


