import { prefixify } from './helpers';

export const QuestionsAction = prefixify(
    '[Questions]',
    {
        FETCH: 'Fetch',
        ON_FETCH_SUCCESS: 'On fetch success',
        ON_FETCH_FAIL: 'On fetch fail',
        UPDATE: 'Update',
        SET_SCORE: 'Set score'
    }
);

export function fetchQuestions(date) {
    return {
        type: QuestionsAction.FETCH,
        payload: date
    };
}

export function onFetchQuestionsSuccess(questions) {
    return {
        type: QuestionsAction.ON_FETCH_SUCCESS,
        payload: questions
    };
}

export function onFetchQuestionsFail(error) {
    return {
        type: QuestionsAction.ON_FETCH_FAIL,
        payload: error
    };
}

export function updateQuestions(questions) {
    return {
        type: QuestionsAction.UPDATE,
        payload: questions
    };
}

export function setQuestionScore(score, id) {
    return {
        type: QuestionsAction.SET_SCORE,
        payload: {
            id,
            score
        }
    };
}
