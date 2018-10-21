import lime from '@material-ui/core/colors/lime';
import cyan from '@material-ui/core/colors/cyan';
import grey from '@material-ui/core/colors/grey';
import { rgba } from './helpers';

const shadowColor = cyan[200];
const scoreSize = '30px';

export const QuestionStyles = theme => ({
    root: {
        width: '100%'
    },
    panel: {
        backgroundColor: grey[50]
    },
    isAnswered: {
        backgroundColor: lime[400]
    },
    details: {
        backgroundColor: '#fff'
    },
    isAnsweredDetails: {
        backgroundColor: lime[100]
    },
    isMarkedForMove: {
        boxShadow: `0px 1px 3px 0px ${rgba(shadowColor, 0.2)},
                    0px 1px 1px 0px ${rgba(shadowColor, 0.14)},
                    0px 2px 1px -1px ${rgba(shadowColor, 0.12)}`,
        border: `1px solid ${shadowColor}`
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    summaryContent: {
        display: 'flex',
        alignItems: 'center'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '5px',
        paddingRight: '0 !important'
    },
    button: {
        cursor: 'pointer',
        '&:active': {
            transform: 'translateY(1px)'
        }
    },
    score: {
        flexBasis: scoreSize,
        flexShrink: 0,
        height: scoreSize,
        borderRadius: '30%',
        backgroundColor: lime[100],
        lineHeight: scoreSize,
        textAlign: 'center',
        marginLeft: 'auto'
    }
});
