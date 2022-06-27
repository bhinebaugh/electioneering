import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import AttributeList from './AttributeList';
import './card.css'

const Description = ({text}) => {
    return <p>{text}</p>
}

const Effects = ({name, effects}) => {
    return (
        <ul className="effects">
            {Object.keys(effects).map(effect => <li key={name+effect}><span className="term">{effect}:</span><span className="value">{effects[effect] > 0 ? '+' : '' }{effects[effect]}</span></li>)}
        </ul>
    )
    /* <AttributeList attributes={attributes.reduce((o, a) => { o[a] = 1; return o }, {})} /> */

}

const Card = ({ name, description, type, requirements, limits, effects, attributes, provided, onHover, ...rest }) => {
    const [descriptionVisibility, setDescriptionVisibility] = useState(false);
    var reqHtml = <div className="requirements"></div>;
    if (requirements) {
        const requirementDivs = 
        ["funding","staff","volunteers"].map(r => {

            const classNames= ["req-"+r]
            // compare to candidate's resources
            if (limits[r] && limits[r] < requirements[r]) {
                classNames.push("warn")
            }

            return <div className={classNames.join(" ")}>{requirements[r] || '-'}</div>
        })
        reqHtml = <div className="requirements">{requirementDivs}</div>
    }

    return (
        <div className={"card " + type}
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
                <section className="content-toggle">
                    <div>effects</div>
                    <img className="icon" src="/description.svg" alt={description} onClick={() => setDescriptionVisibility(!descriptionVisibility)} />
                </section>
                <section>
                {
                    descriptionVisibility 
                    ? <Description text={description} /> 
                    : <Effects name={name} effects={effects} /> 
                }
                </section>
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