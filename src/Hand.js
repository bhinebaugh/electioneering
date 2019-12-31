import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import './hand.css';

function Hand(props) {
    return(
        <div className="hand"
            ref={props.provided.innerRef}
            {...props.provided.droppableProps}
        >
            <h2>{props.title}</h2>
            {props.hand.map( (card, index) => (
                <Draggable
                    draggableId={card.name}
                    index={index}
                >
                    {provided => (
                        <Card
                            provided={provided}
                            name={card.name}
                            effects={card.effects}
                        />
                    )}
                </Draggable>
            ))}
            {props.children}
        </div>
    )
}

export default Hand;