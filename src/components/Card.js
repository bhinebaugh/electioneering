import React from 'react';
import PropTypes from 'prop-types';
import AttributeList from './AttributeList';
import './card.css'

const Card = ({ name, description, requirements, effects, attributes, provided, onHover, ...rest }) => {
    var reqHtml = <div className="requirements"></div>;
    if (requirements) {
        const { funding, staff, volunteers } = requirements;
        reqHtml = <div className="requirements">
                <div className="req-funds">{funding || '-'}</div>
                <div className="req-staff">{staff || '-'}</div>
                <div className="req-volunteers">{volunteers || '-'}</div>
            </div>
    }
    return (
        <div className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onPointerEnter={() => onHover(requirements)}
            onPointerLeave={() => onHover(null)}
        >
            <header>
                <h1>{name}</h1>
                {reqHtml}
            </header>
            <div className="content">

            <p className="description">{description}</p>
            <ul className="effects">
                {Object.keys(effects).map(effect => <li key={name+effect}><span className="term">{effect}:</span><span className="value">{effects[effect] > 0 ? '+' : '' }{effects[effect]}</span></li>)}
            </ul>
            {/* <AttributeList attributes={attributes.reduce((o, a) => { o[a] = 1; return o }, {})} /> */}
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