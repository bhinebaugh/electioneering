import React from 'react';
import { PropTypes } from 'prop-types';
import Candidate from './Candidate';
import Hand from './Hand';
import { Droppable } from "react-beautiful-dnd";
import './side.css'

class Side extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { candidate, order } = this.props;
        return (
            <div className="side">
                <Droppable droppableId={"c"+candidate.id} direction="horizontal">
                    {(provided, snapshot) => (
                        <Candidate
                            name={candidate.name}
                            stats={candidate.stats}
                            provided={provided}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {provided.placeholder}
                        </Candidate>
                    )}
                </Droppable>
                <Droppable droppableId={candidate.id} direction="horizontal">
                    {(provided, snapshot) => (
                        <Hand
                            cards={order.map(cardId => candidate.hand.find(card => card.id === cardId))}
                            handId={candidate.id}
                            provided={provided}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {provided.placeholder}
                        </Hand>
                    )}
                </Droppable>
            </div>
        )
    }
}

Side.propTypes = {
    candidate: PropTypes.object,
    hands: PropTypes.object,
}

export default Side;