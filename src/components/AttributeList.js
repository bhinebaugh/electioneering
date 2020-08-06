import React from 'react';
import './attributes.css';

export default function AttributeList(props) {
    return (
        <ul className="attributes">
            {Object.keys(props.attributes).map(attr =>
                props.attributes[attr] > 1
                    ? <li key={attr}>{attr}<span>({props.attributes[attr]})</span></li>
                    : <li key={attr}>{attr}</li>
            )}
        </ul>
    )
}