/* global VK:true */

import React from 'react';
import { render } from 'react-dom';

import App from './components/App.jsx';

import { Provider } from 'react-redux';
import configureStore from './configureStore.js';

const store = configureStore();

VK.init({
  apiId: 5530846,
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
