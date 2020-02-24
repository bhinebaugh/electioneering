import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import './hand.css';

function Hand(props) {
    return(
        <div className="hand"
            style={props.isDraggingOver ? { "background": "blue" } : null}
            ref={props.provided.innerRef}
            {...props.provided.droppableProps}
        >
            {props.cards && props.cards.map( (card, index) => (
                <Draggable
                    draggableId={card.id}
                    key={card.id}
                    index={index}
                    isDragDisabled={props.waitingTurn}
                >
                    {provided => (
                        <Card
                            provided={provided}
                            name={card.name}
                            description={card.description}
                            effects={card.effects}
                            attributes={card.attributes}
                        />
                    )}
                </Draggable>
            ))}
            {props.children}
        </div>
    )
}

Hand.propTypes = {
    cards: PropTypes.array,
}

export default Hand;