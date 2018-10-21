import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { cloneDeep } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { fetchQuestions, updateQuestions, setQuestionScore } from 'app/actions';
import { questionShape } from 'app/shapes';
import { DraggableQuestion, DatePane } from 'app/components';

const styles = () => ({
    root: {
        width: '600px',
        margin: '0 auto'
    }
});

class AppComponent extends Component {
    defaultSearchDate = new Date(2018, 0, 1);

    state = {
        expandedId: null,
        movingIndex: null,
    };

    constructor() {
        super();

        this.onQuestionClick = this.onQuestionClick.bind(this);
        this.onQuestionDoubleClick = this.onQuestionDoubleClick.bind(this);
        this.onMoveQuestion = this.onMoveQuestion.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.setContainerNode = this.setContainerNode.bind(this);
        this.onSetScore = this.onSetScore.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    render() {
        const {
            expandedId,
            movingIndex
        } = this.state;

        const {
            questions,
            classes
        } = this.props;

        return (
            <div ref={this.setContainerNode}
                className={classes.root}>
                <DatePane
                    search={this.onSearchClick}
                    defaultSearchDate={this.defaultSearchDate}
                />
                {questions.map((question, index) => (
                    <DraggableQuestion
                        expandedId={expandedId}
                        movingIndex={movingIndex}
                        onQuestionClick={this.onQuestionClick}
                        onQuestionDoubleClick={this.onQuestionDoubleClick}
                        moveQuestion={this.onMoveQuestion}
                        setScore={this.onSetScore}
                        index={index}
                        key={question.id}
                        {...question}
                    />
                ))}
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
        this.props.dispatch(fetchQuestions(this.defaultSearchDate));
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    setContainerNode(node) {
        this.containerNode = node;
    }

    handleDocumentClick(event) {
        if (this.containerNode && !this.containerNode.contains(event.target)) {
            this.setState({
                expandedId: null,
                movingIndex: null
            });
        }
    }

    onQuestionClick(questionId) {
        this.setState({
            expandedId: questionId === this.state.expandedId ? null : questionId
        });
    }

    onQuestionDoubleClick(questionIndex) {
        if (!this.state.movingIndex) {
            this.setState({
                movingIndex: questionIndex
            });

            return;
        }

        if (this.state.movingIndex && this.state.movingIndex !== questionIndex) {
            this.onMoveQuestion(this.state.movingIndex, questionIndex);
        }

        this.setState({
            movingIndex: null
        });
    }

    onMoveQuestion(fromIndex, toIndex) {
        const questions = cloneDeep(this.props.questions);
        const from = questions.splice(fromIndex, 1)[0];

        questions.splice(toIndex, 0, from);

        this.props.dispatch(updateQuestions(questions));

        if ([fromIndex, toIndex].includes(this.state.movingIndex)) {
            this.setState({movingIndex: this.state.movingIndex === toIndex ? fromIndex : toIndex});
        }
    }

    onSetScore(score, questionId) {
        this.props.dispatch(setQuestionScore(score, questionId));
    }

    onSearchClick(date) {
        this.props.dispatch(fetchQuestions(date));
    }
}

AppComponent.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape(questionShape)
    ),
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    questions: state.questions.items
});

export const App = connect(mapStateToProps)(
    withStyles(styles)(
        DragDropContext(HTML5Backend)(AppComponent)
    )
);
