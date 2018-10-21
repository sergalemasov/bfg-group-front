import { QuestionsAction } from 'app/actions';
import { cloneDeep } from 'lodash';

export function questions(
    state = {
        isLoading: false,
        items: [],
        error: null
    },
    action
) {
    switch (action.type) {
        case QuestionsAction.FETCH:
            return {
                isLoading: true,
                ...cloneDeep(state)
            };

        case QuestionsAction.UPDATE:
        case QuestionsAction.ON_FETCH_SUCCESS:
            return {
                isLoading: false,
                items: action.payload,
                error: null
            };

        case QuestionsAction.ON_FETCH_FAIL:
            return {
                isLoading: false,
                items: [],
                error: action.payload
            };

        case QuestionsAction.SET_SCORE:
            const {
                id,
                score
            } = action.payload;
            const items = cloneDeep(state.items);
            const updatingItem = items.find(item => item.id === id);

            if (updatingItem) {
                updatingItem.score = score;
            }

            return {
                isLoading: false,
                items,
                error: null
            };

        default:
            return state;
    }
}
