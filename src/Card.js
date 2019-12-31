import React from 'react';
import PropTypes from 'prop-types';
import './card.css'

const Card = ({ name, description, effects, provided, ...rest }) => {
    return (
        <div className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
            <h1>{name}</h1>
            <div className="content">

            <p>{description}</p>
            <ul className="effects">
                {Object.keys(effects).map(effect => <li key={name+effect}>{effect}: {effects[effect]}</li>)}
            </ul>
            </div>
        </div>
    )
}

Card.defaultProps = {
    name: "a blank card",
    description: "the most generic card",
}
Card.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
}

export default Card;