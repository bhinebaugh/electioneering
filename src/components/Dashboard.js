import React from 'react';
import { Log, Polls } from './index';

import './dashboard.css';

{/* 
    <Polls />
    <State />
    <Log /> 
*/}

function Dashboard(props) {
    const { candidatesById, turnOrder, turnNumber, round, winner } = props.gameState;
    return (
        <div className="dashboard">
            <h3>Developer Dashboard</h3>
            <div className="central-section">
                <Log messages={props.logs} />
                <div>
                    Round: {round} weeks to go<br/>
                    Turn order: {(turnOrder && turnOrder.join(', ')) || "n/a"}<br/>
                    Current turn: {turnNumber}<br/>
                    Winner: {winner || "TBD"}
                </div>
                <Polls candidates={props.candidates} />
            </div>
        </div>
    )
}

export default Dashboard