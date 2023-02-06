import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client'
import reducers from './reducers'

import {Provider} from 'react-redux'
import {createStore} from 'redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers)


root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
