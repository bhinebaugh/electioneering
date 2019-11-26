import React from 'react';
import PropTypes from 'prop-types';
import './card.css'

const Card = ({ name, description, effects, ...rest }) => {
    return (
        <div className="card">
            <h1>{name}</h1>
            <div className="content">

            <p>{description}</p>
            <ul className="effects">
                {Object.keys(effects).map(effect => <li>{effect}</li>)}
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