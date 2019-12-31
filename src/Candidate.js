import React from 'react';
import PropTypes from 'prop-types';
import './candidate.css';

function Candidate(props) {
    return (
        <div className="candidate">
            <h2>{props.name}</h2>
            {Object.keys(props.stats).map(stat => <dl key={stat}><dt>{stat}</dt><dd>{props.stats[stat]}</dd></dl>)}
        </div>
    )
}

Candidate.propTypes = {

}

export default Candidate;