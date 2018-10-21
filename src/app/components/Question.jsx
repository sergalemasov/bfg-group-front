import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { withStyles } from '@material-ui/core/styles';
import { questionShape } from 'app/shapes';
import { className } from './helpers';
import { QuestionStyles } from './QuestionStyles';

export class QuestionComponent extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.incrementScore = this.incrementScore.bind(this);
        this.decrementScore = this.decrementScore.bind(this);
    }

    render() {
        const {
            classes,
            id,
            expandedId,
            isAnswered,
            title,
            movingIndex,
            index,
            score,
            name,
            reputation,
            viewCount,
            lastActivityDate
        } = this.props;
        const isMarkedForMove = movingIndex === index;

        const panelClasses = className({
            [classes.panel]: true,
            [classes.isAnswered]: isAnswered,
            [classes.isMarkedForMove]: isMarkedForMove
        });

        const detailsClasses = className({
            [classes.details]: true,
            [classes.isAnsweredDetails]: isAnswered
        });

        const details = [
            `Author name: ${name}`,
            `Reputation: ${reputation}`,
            `Count of views: ${viewCount}`,
            `Last activity date: ${lastActivityDate.toDateString()}`
        ];

        return (
            <div
                onDoubleClick={this.handleDoubleClick}
                className={classes.root}
            >
                <ExpansionPanel
                    expanded={expandedId === id}
                    onChange={this.handleClick}
                    className={panelClasses}
                >
                    <ExpansionPanelSummary classes={{content: classes.summaryContent}}>
                        <Typography className={classes.heading}>
                            {title}
                        </Typography>
                        <div className={classes.score}>
                            {score}
                        </div>
                        <div className={classes.buttons}>
                            <KeyboardArrowUp
                                onDoubleClick={this.stopDoubleClickPropagation}
                                onClick={this.incrementScore}
                                className={classes.button}/>
                            <KeyboardArrowDown
                                onDoubleClick={this.stopDoubleClickPropagation}
                                onClick={this.decrementScore}
                                className={classes.button}/>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={detailsClasses}>
                        <List dense={true}>
                            {details.map((detail, i) => (
                                <ListItem key={i}>
                                    <ListItemText primary={detail} />
                                </ListItem>
                            ))}
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

    handleClick() {
        this.props.onQuestionClick(this.props.id);
    }

    handleDoubleClick() {
        this.props.onQuestionDoubleClick(this.props.index);
    }

    incrementScore(event) {
        this.setScore(1, event);
    }

    decrementScore(event) {
        this.setScore(-1, event);
    }

    setScore(addition, event) {
        if (event) {
            event.stopPropagation();
        }

        const newScore = this.props.score + addition;
        this.props.setScore(newScore, this.props.id);
    }

    stopDoubleClickPropagation(event) {
        if (event) {
            event.stopPropagation();
        }
    }
}

QuestionComponent.propTypes = {
    ...questionShape,
    index: PropTypes.number,
    movingIndex: PropTypes.number,
    expandedId: PropTypes.number,
    onQuestionClick: PropTypes.func,
    setScore: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export const Question = withStyles(QuestionStyles)(QuestionComponent);
