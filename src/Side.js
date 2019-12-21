import React from 'react';
import { PropTypes } from 'prop-types';
import Candidate from './Candidate';
import Hand from './Hand';
import './side.css'

function Side(props) {
    return (
        <div className="side">
            <Candidate name={props.candidate.name} stats={props.candidate.stats} />
            <Hand hand={props.hand} />
        </div>
    )
}

Side.propTypes = {
    candidate: PropTypes.object,
    hands: PropTypes.object,
}

export default Side;