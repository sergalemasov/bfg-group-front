import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import { questionShape } from 'app/shapes';

const styles = theme => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
});

export class QuestionComponent extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }

    render() {
        return (
            <div
                onDoubleClick={this.handleDoubleClick}
                className={this.props.classes.root}
            >
                <ExpansionPanel
                    expanded={this.props.expandedId === this.props.id}
                    onChange={this.handleClick}
                >
                    <ExpansionPanelSummary>
                        <Typography className={this.props.classes.heading}>
                            Expansion Panel {this.props.id}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                        </Typography>
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
}

QuestionComponent.propTypes = {
    ...questionShape,
    index: PropTypes.number,
    movingIndex: PropTypes.number,
    expandedId: PropTypes.number,
    onQuestionClick: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export const Question = withStyles(styles)(QuestionComponent);
