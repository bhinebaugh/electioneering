import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import './card-target.css';

// Component that renders any child elements inside a drop area
// and indicates hover with bg color of absolutely positioned div
const CardTarget = (props) => (
    <Droppable droppableId={props.id} direction="horizontal">
        {(provided, snapshot) => (
            <div
                className={"droppable-container " + (snapshot.isDraggingOver ? "targeted" : "")}
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                <div className="card-drop">
                    {provided.placeholder}
                </div>
                {props.children}
            </div>
        )}
    </Droppable>
)

export default CardTarget;