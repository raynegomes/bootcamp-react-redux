import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const development = process.env.NODE_ENV === 'development';

const sagaMonitor = development ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

const enhancer =
  development
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
