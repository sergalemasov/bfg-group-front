import PropTypes from 'prop-types';

export const questionShape = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    isAnswered: PropTypes.bool.isRequired,
    name: PropTypes.string,
    reputation: PropTypes.number,
    viewCount: PropTypes.number,
    lastActivityDate: PropTypes.instanceOf(Date)
};
