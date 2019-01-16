import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Reactmasonrycomponent from './Reactmasonrycomponent';
import * as serviceWorker from './serviceWorker';

// The purpose of this file is to assemble the application and render it to the DOM

ReactDOM.render(<Reactmasonrycomponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
