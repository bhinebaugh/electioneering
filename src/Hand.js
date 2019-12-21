import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './hand.css';

function Hand(props) {
    return(
        <div className="hand">
            {props.hand.map( card => <Card name={card.name} effects={card.effects} />)}
        </div>
    )
}

export default Hand;