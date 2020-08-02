import React from 'react';
import { Polls } from './index';

{/* 
    <Polls />
    <State />
    <Log /> 
*/}

function Dashboard(props) {
    return (
        <div className="hand">
            <h3>Developer Dashboard</h3>
            <Polls candidates={props.candidates} />
            <div className="central-section">
                <p>Round: {props.round} weeks to go</p>
            </div>
        </div>
    )
}

export default Dashboard