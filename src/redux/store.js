import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

//we technically don't need export below
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//we technically don't need export below
export const persistor = persistStore(store);

export default {store, persistor};