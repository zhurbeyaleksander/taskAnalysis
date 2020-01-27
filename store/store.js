import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

export function configureStore(preloadedState) {
  const enhancer = compose(applyMiddleware(thunk, logger));

  return createStore(reducers, preloadedState, enhancer);
}
