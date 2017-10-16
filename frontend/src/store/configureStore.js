import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';  
import rootReducer from "../reducers";
import rootSaga from "../sagas/index";

// Allow Redux devtools to work with Redux Sagas.
/* eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

// Returns the store instance. Accepts initial state if provided.
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = {
    ...createStore(rootReducer,
      composeSetup(applyMiddleware(sagaMiddleware))),
      runSaga: sagaMiddleware.run(rootSaga)
  };

  return store;
};

export default configureStore;