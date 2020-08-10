import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middlewares = [thunkMiddleware];

middlewares.push(createLogger());

const store = createStore(state => state, {}, applyMiddleware(...middlewares));
export default store;
