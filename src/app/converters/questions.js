import { convertSecondsFromEpochToDate } from './date';

export function convertQuestions(response, url) {
    if (!response || response.quota_remaining === undefined) {
        throw new Error(`There is something wrong with response from ${url}!`);
    }

    if (response.quota_remaining === 0) {
        throw new Error(`Stack overflow quota limit has been exceeded!`);
    }

    return response.items && response.items.length
        ? response.items.map(convertQuestion)
        : [];
}

function convertQuestion(responseQuestion) {
    const {
        title,
        score,
        owner,
        is_answered,
        view_count,
        last_activity_date,
        question_id: id
    } = responseQuestion;

    const isAnswered = !!is_answered;

    const name = owner && owner.display_name ? owner.display_name : null;
    const reputation = owner && owner.reputation !== undefined ? owner.reputation : null;
    const viewCount = view_count !== undefined ? view_count : null;
    const lastActivityDate = last_activity_date !== undefined
        ? convertSecondsFromEpochToDate(last_activity_date)
        : null;

    return {
        id,
        title,
        score,
        name,
        reputation,
        isAnswered,
        viewCount,
        lastActivityDate
    };
}
