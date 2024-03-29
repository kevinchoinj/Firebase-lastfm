import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import 'styles/menu.css';
import 'styles/home.css';
import 'styles/panels.css';

import App from './App';

import {Provider} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Store, { history } from './store';

const StoreInstance = Store();

ReactDOM.render(
<Provider store={StoreInstance}>
  <ConnectedRouter history={history}>
    <div>
      <App />
    </div>
  </ConnectedRouter>
</Provider>
, document.getElementById('root'));