import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

const middleWares = _ENV === 'production' ? [thunk] : [thunk, logger];

export default createStore(reducer, applyMiddleware(...middleWares));
