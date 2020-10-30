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
        <div className="dashboard well">
            <h3>Developer Dashboard</h3>
            <div className="central-section">
                <Log messages={props.logs} />
                <div>
                    Round: {round} weeks to go of {props.campaignLength}<br/>
                    Turn order: {(turnOrder && turnOrder.join(', ')) || "n/a"}<br/>
                    Current turn: {turnNumber}<br/>
                    Winner: {winner || "TBD"}
                </div>
                <Polls polling={props.polling} campaignLength={props.campaignLength} />
            </div>
        </div>
    )
}

export default Dashboard