import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { rootReducer } from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export function configureStore(preloadedState) {
    preloadedState = preloadedState || {};

    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            sagaMiddleware
        )
    )

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    sagaMiddleware.run(rootSaga);

    return store;
}

