import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello from React</h1>,
    document.getElementById('root')
);

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello webpack';
    return element;
}
document.body.appendChild(component());