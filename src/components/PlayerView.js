import React from 'react';
import { PropTypes } from 'prop-types';
import Candidate from './Candidate';
import Hand from './Hand';
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from 'react-beautiful-dnd';

import './player-view.css'

class PlayerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activated: false,
            cardsInOrder: this.props.candidate.hand,
            exceeded: []
        }
    }

    componentDidUpdate(prevProps) {
        // if cards changed, add new ones to end of local card order
        if (prevProps.candidate.hand !== this.props.candidate.hand) {
            const newCards = this.props.candidate.hand.filter(card => !prevProps.includes(card));
            this.setState({
                cardsInOrder: [...this.state.cardsInOrder, newCards]
            })    
        }
    }

    highlightRequirements = (reqs) => {
        var invalids = [];
        if (reqs) {
            invalids = Object.keys(reqs).filter(r => reqs[r] > this.props.candidate.resources[r])
        }
        this.setState({ exceeded: invalids })
    }

    // remove or reorder cards
    updateCardOrder(sourceIndex, destinationIndex=-1) {
        let newOrder = Array.from(this.state.cardsInOrder);
        let [removedCard] = newOrder.splice(sourceIndex, 1);
        if (destinationIndex >= 0) newOrder.splice(destinationIndex, 0, removedCard);
        this.setState({
          cardsInOrder: newOrder
        });
    }

    handleDragEnd = (result) => {
        const { draggableId, destination, source } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            // Rearrange card order within current hand
            if (source.index === destination.index) return;
            this.updateCardOrder(source.index, destination.index)
        } else {
            const card = draggableId;
            const target = destination;
            this.props.playCard(card, target, source)
        }
    }

    render() {
        let { candidate, active } = this.props;
        return (
            <DragDropContext onDragEnd={this.handleDragEnd}>
                <div className="side PlayerView">
                    <Droppable droppableId={"c"+candidate.id} direction="horizontal">
                        {(provided, snapshot) => (
                            <Candidate
                                name={candidate.name}
                                stats={candidate.stats}
                                resources={candidate.resources}
                                exceeded={this.state.exceeded}
                                active={active}
                                characteristics={candidate.characteristics}
                                provided={provided}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <div className="card-drop">
                                    {provided.placeholder}
                                </div>
                            </Candidate>
                        )}
                    </Droppable>
                    <Droppable droppableId={candidate.id} direction="horizontal">
                        {(provided, snapshot) => (
                            <Hand
                                // cards={order.map(cardId => candidate.hand.find(card => card.id === cardId))}
                                cards={this.state.cardsInOrder}
                                handId={candidate.id}
                                provided={provided}
                                isDraggingOver={snapshot.isDraggingOver}
                                waitingTurn={!active}
                                highlightRequirements={this.highlightRequirements}
                            >
                                {provided.placeholder}
                            </Hand>
                        )}
                    </Droppable>
                    {/* <Opponent desc="short version of <Candidate> that's also a drop target"> */}
                </div>
            </DragDropContext>
        )
    }
}

PlayerView.propTypes = {
    candidate: PropTypes.object,
    hands: PropTypes.object,
}

export default PlayerView;