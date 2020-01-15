import React from 'react';
import './attributes.css';

export default function AttributeList(props) {
    return (
        <ul className="attributes">
            {props.attributes.map(attr => <li key={attr}>{attr}</li>)}
        </ul>
    )
}