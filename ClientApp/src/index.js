import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { Provider } from 'react-redux';
import configureStore from './store/store';

import registerServiceWorker from './registerServiceWorker';
import { Auth0Provider } from './auth0-wrapper';
import config from './auth_config.json';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const store = configureStore({});

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl ? 
      appState.targetUrl : window.location.pathname
  );
}

ReactDOM.render(
  <Provider store={store}>
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback} >
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </Auth0Provider>
  </Provider>,
  rootElement);

registerServiceWorker();

