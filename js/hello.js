import React from 'react';

var Hello = React.createClass({
    render(){
        console.log('hello render');
        return (
            <div>Hello World!!!</div>
        );
    }
});

export default Hello;
