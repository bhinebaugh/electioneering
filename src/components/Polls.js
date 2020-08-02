import React from 'react';
import './polls.css';

function Polls(props) {
    return (
        <div id="polls">
            <div id="latest-poll">
                {props.candidates.map(c => (
                    <dl key={c.name}><dt>{c.name.split(' ').pop()}</dt><dd>{c.stats.polling}%</dd></dl>
                ))}
            </div>
            <div className="central-section">
                <p>Round: {props.round} weeks to go</p>
            </div>
        </div>
    )
}

export default Polls;