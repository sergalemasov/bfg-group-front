import { all } from 'redux-saga/effects';
import { watchFetchQuestions } from './questions';

export function* rootSaga() {
    yield all([
        watchFetchQuestions()
    ]);
}
