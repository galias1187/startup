import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import movieApp from './reducers/reducers.js';
import App from './components/app.js'
import './index.css'

// =============================

//Creates a store from movieApp reducer
let store = createStore(movieApp);

//Renders app
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
