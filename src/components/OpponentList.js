import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const Opponent = ({id, name}) => (
    <Droppable droppableId={id} direction="vertical">
        {(provided, snapshot) => (
            <li ref={provided.innerRef} {...provided.droppableProps}>
                {name}
            </li>
        )}
    </Droppable>
)

const OpponentList = ({opponents}) => {
    return (
        opponents ?
        <div>
            <header>Opponent(s)</header>
            <ul>
                {Object.values(opponents).map(o => <Opponent id={o.id} name={o.name} />)}
            </ul>
        </div>
        :
        <p>running uncontested</p>
    )
}

export default OpponentList;