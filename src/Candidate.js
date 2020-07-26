import React from 'react';
import PropTypes from 'prop-types';
import AttributeList from './AttributeList';
import ResourcesList from './ResourcesList';
import './candidate.css';

function Candidate(props) {
    var componentClasses = ["candidate"];
    const { funding, staff, volunteers } = props.resources;
    if (props.active) componentClasses.push("active");
    if (props.isDraggingOver) componentClasses.push("targeted");
    return (
        <div className={componentClasses.join(" ")}
            ref={props.provided.innerRef}
            {...props.provided.droppableProps}
        >
            <h2>{props.name}</h2>
            <ResourcesList resources={props.resources} exceeded={props.exceeded} />
            <table>
                <thead><tr><th colSpan="2">statistics</th></tr></thead>
                <tbody>
                {Object.keys(props.stats).map(stat => (
                    <tr key={stat}><td>{stat}</td><td>{props.stats[stat]}</td></tr>
                ))}
                </tbody>
            </table>
            <AttributeList attributes={props.characteristics} />
            {props.children}
        </div>
    )
}

Candidate.propTypes = {
    name: PropTypes.string,
    stats: PropTypes.object,
}

export default Candidate;