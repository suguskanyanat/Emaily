// import 'materialize-css/dist/css/materialize.min.css';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk'; //fix this

// import App from './components/App';
// import reducers from './reducers';

// const store = createStore((reducers) => [], {}, applyMiddleware());

// ReactDOM.render(
//     <Provider store={store}><App /></Provider>, //can read all the app states directly
//     document.querySelector('#root'));

import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//dev only axios helpers -> delete after finish testing
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
