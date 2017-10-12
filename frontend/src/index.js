import React from 'react';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "./index.css"

// Initialize Redux store.
const store = configureStore();

ReactDOM.render(
  <Provider store = { store }>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
