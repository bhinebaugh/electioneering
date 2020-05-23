import React from 'react';
import PropTypes from 'prop-types';
import AttributeList from './AttributeList';
import './card.css'

const Card = ({ name, description, requirements, effects, attributes, provided, ...rest }) => {
    var reqHtml = <div className="requirements"></div>;
    if (requirements) {
        const { funding, staff, volunteers } = requirements;
        reqHtml = <div className="requirements">
                <div class="req-funds">{funding}</div>
                <div class="req-staff">{staff}</div>
                <div class="req-volunteers">{volunteers}</div>
            </div>
    }
    return (
        <div className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
            <header>
                <h1>{name}</h1>
                {reqHtml}
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