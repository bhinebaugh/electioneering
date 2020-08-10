import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import './hand.css';

function Hand(props) {
    var domClasses = ["hand","well"]
    if (props.isDraggingOver) { domClasses.push("targeted") }
    if (props.waitingTurn) { domClasses.push("waiting") }
    return(
        <div className={domClasses.join(" ")}
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
                            requirements={card.requirements}
                            effects={card.effects}
                            attributes={card.attributes}
                            onHover={props.highlightRequirements}
                        />
                    )}
                </Draggable>
            ))}
            {props.children}
            <div className="notice">
                <p>awaiting turn</p>
            </div>
        </div>
    )
}

Hand.propTypes = {
    cards: PropTypes.array,
}

export default Hand;