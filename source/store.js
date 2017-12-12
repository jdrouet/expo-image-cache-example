import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './reducer';
import sagas from './saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
];

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(...middleware),
);

sagaMiddleware.run(sagas);

export default store;
