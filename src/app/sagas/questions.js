import { call, put, takeLatest } from 'redux-saga/effects';
import { QuestionsAction, onFetchQuestionsSuccess, onFetchQuestionsFail } from 'app/actions';
import { convertQuestions, convertDateToSecondsFromEpoch } from 'app/converters';
import { createRequestFn, createQuery } from './helpers';

const baseStackOverflowApiUrl = 'https://api.stackexchange.com/2.2';

const makeQuestionsRequest = createRequestFn();

function* fetchQuestions(action) {
    const fromdate = convertDateToSecondsFromEpoch(action.payload);
    const queryParams = {
        page: 1,
        pagesize: 5,
        fromdate,
        order: 'desc',
        sort: 'votes',  // sorting by score
        intitle: 'react-redux',
        site: 'stackoverflow',
        filter: '!)Q2AgVnfcEnPTN7u99XMA.Ua',  // receiving the necessary minimum of response fields
        key: '5QFpmTMQfxM1m6vFID5J2Q(('
    };
    const searchEndpoint = '/search';
    const url = `${baseStackOverflowApiUrl}${searchEndpoint}${createQuery(queryParams)}`;

    try {
        const questionsResponse = yield call(makeQuestionsRequest, url);
        const convertedQuestions = yield call(convertQuestions, questionsResponse, url);

        yield put(onFetchQuestionsSuccess(convertedQuestions));
    } catch(err) {
        yield put(onFetchQuestionsFail(err));
    }
}

export function* watchFetchQuestions() {
    yield takeLatest(QuestionsAction.FETCH, fetchQuestions);
}
