import React from 'react';
import PropTypes from 'prop-types';
import AttributeList from './AttributeList';
import './card.css'

const Card = ({ name, description, effects, attributes, provided, ...rest }) => {
    return (
        <div className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
            <header>
                <h1>{name}</h1>
                <div className="requirements">
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                </div>
            </header>
            <div className="content">

            <p className="description">{description}</p>
            <ul className="effects">
                {Object.keys(effects).map(effect => <li key={name+effect}>{effect}: {effects[effect]}</li>)}
            </ul>
            <AttributeList attributes={attributes} />
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