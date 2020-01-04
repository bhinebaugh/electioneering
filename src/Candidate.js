import React from 'react';
import PropTypes from 'prop-types';
import './candidate.css';

function Candidate(props) {
    return (
        <div className="candidate">
            <h2>{props.name}</h2>
            <table>
                <thead><td>stat</td><td>value</td></thead>
                {Object.keys(props.stats).map(stat => (
                    <tr><td>{stat}</td><td>{props.stats[stat]}</td></tr>
                ))}
            </table>
        </div>
    )
}

Candidate.propTypes = {

}

export default Candidate;