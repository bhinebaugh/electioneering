import React from 'react';
import { PropTypes } from 'prop-types';
import Candidate from './Candidate';
import Hand from './Hand';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import './side.css'

function Side(props) {
    var onDragEnd = result => {
        console.log("dragged to", result.destination)
    }

    return (
        <div className="side">
            <Candidate name={props.candidate.name} stats={props.candidate.stats} />
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Droppable droppableId={props.handId}>
                    {(provided) => (
                        <Hand
                            hand={props.hand}
                            title="your cards" 
                            handId="1"
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

Side.propTypes = {
    candidate: PropTypes.object,
    hands: PropTypes.object,
}

export default Side;