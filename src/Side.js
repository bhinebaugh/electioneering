import React from 'react';
import { PropTypes } from 'prop-types';
import Candidate from './Candidate';
import Hand from './Hand';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import './side.css'

class Side extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.hand.map(card => card.name),
            cards: this.props.hand
        }
    }

    onDragEnd = result => {
        const { draggableId, destination, source } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            // rearranging card order within current hand
            if (source.index === destination.index) return;
            let newOrder = Array.from(this.state.order);
            let movedCard = newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, movedCard[0]);
            this.setState({
                order: newOrder,
                cards: newOrder.map(id => this.props.hand.find(c => c.name === id)),
            })
        } else {
            // card was played to another area (activate, attack, discard, ...)
            console.log(draggableId, "card was played")
        }
    }

    render() {
        let { candidate, handId } = this.props;
        return (
            <div className="side">
                <Candidate name={candidate.name} stats={candidate.stats} />
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable droppableId={handId}>
                        {(provided) => (
                            <Hand
                                cards={this.state.cards}
                                title="your cards" 
                                handId={handId}
                                provided={provided}
                            >
                                {provided.placeholder}
                            </Hand>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

Side.propTypes = {
    candidate: PropTypes.object,
    hands: PropTypes.object,
}

export default Side;