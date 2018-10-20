import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga';
import { rootReducer } from './reducers';
import { rootSaga } from './sagas';

// const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

export function configureStore(preloadedState) {
    preloadedState = preloadedState || {};

    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            sagaMiddleware,
            //loggerMiddleware
        )
    )

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    sagaMiddleware.run(rootSaga);

    return store;
}

