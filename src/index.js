import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';

const values = {
  header: 'Just ToDo List :)',
  todoheader: 'Hey, write down some things you wish to do...',
  addbtn: 'Add item',
  savebtn: 'Save list',
  deletebtn: 'delete',
};

ReactDOM.render(
  <App
    header={values.header}
    todoheader={values.todoheader}
    addbtn={values.addbtn}
    savebtn={values.savebtn}
    deletebtn={values.deletebtn}
  />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
