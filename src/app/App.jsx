import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { cloneDeep } from 'lodash';
import { fetchQuestions, updateQuestions } from 'app/actions';
import { questionShape } from 'app/shapes';
import { DraggableQuestion } from 'app/components';

class AppComponent extends Component {
    state = {
        expandedId: null,
        movingIndex: null
    };

    constructor() {
        super();
        this.onQuestionClick = this.onQuestionClick.bind(this);
        this.onQuestionDoubleClick = this.onQuestionDoubleClick.bind(this);
        this.onMoveQuestion = this.onMoveQuestion.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.setContainerNode = this.setContainerNode.bind(this);
    }

    render() {
        return (
            <div ref={this.setContainerNode}>
                {this.props.questions.map((question, index) => (
                    <DraggableQuestion
                        expandedId={this.state.expandedId}
                        movingIndex={this.state.movingIndex}
                        onQuestionClick={this.onQuestionClick}
                        onQuestionDoubleClick={this.onQuestionDoubleClick}
                        moveQuestion={this.onMoveQuestion}
                        index={index}
                        key={question.id}
                        {...question}
                    />
                ))}
            </div>
        );
    }

    componentWillMount() {
        this.props.dispatch(fetchQuestions(new Date(2018, 1, 1)));
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick)
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
    }
}

AppComponent.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape(questionShape)
    )
};

const mapStateToProps = state => ({
    questions: state.questions.items
});

export const App = connect(mapStateToProps)(
    DragDropContext(HTML5Backend)(AppComponent)
);
