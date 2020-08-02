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
            exceeded: []
        }
    }

    highlightRequirements = (reqs) => {
        var invalids = [];
        if (reqs) {
            invalids = Object.keys(reqs).filter(r => reqs[r] > this.props.candidate.resources[r])
        }
        this.setState({ exceeded: invalids })
    }

    render() {
        let { candidate, active, handleDragEnd } = this.props;
        // DragDropContext onDragEnd={this.props.handleDragEnd}
        return (
            <DragDropContext onDragEnd={handleDragEnd}>
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
                                cards={candidate.hand}
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