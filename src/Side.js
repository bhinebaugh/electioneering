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
                <Candidate name={candidate.name} stats={candidate.stats} />
                    <Droppable droppableId={candidate.id} direction="horizontal">
                        {(provided, snapshot) => (
                            <Hand
                                cards={order.map(cardName => candidate.hand.find(card => card.name === cardName))}
                                title="your cards" 
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