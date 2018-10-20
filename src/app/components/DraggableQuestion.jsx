import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { questionShape } from 'app/shapes';
import { Question } from './Question';

const sourceType = 'question';

const questionSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        };
    }
};

const questionTarget = {
    hover(props, monitor, component) {
        if (!component) {
            return null;
        }

        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = findDOMNode(
            component
        ).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        props.moveQuestion(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    }
};

class DraggableQuestionComponent extends Component {
    render() {
        const {
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;

        const opacity = isDragging ? 0 : 1;

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(
                    <div style={{opacity}}>
                        <Question {...this.props} />
                    </div>
                )
            )
        );
    }
}

DraggableQuestionComponent.propTypes = {
    ...questionShape,
    index: PropTypes.number.isRequired,
    moveQuestion: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func
};

const DragSourceQuestion = DragSource(
    sourceType,
    questionSource,
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)(DraggableQuestionComponent);

const DraggableQuestion = DropTarget(sourceType, questionTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(DragSourceQuestion);

export { DraggableQuestion };
