import React from 'react';

import { CardTarget } from './index';

const Opponent = ({id, name}) => (
            <li className="hand">
                {name}
            </li>
)

const OpponentList = ({opponents}) => {
    return (
        opponents ?
        <div>
            <header>
                <h3>Your Opponent{opponents.length > 1 ? 's' : ''}</h3>
                <div><i>drag a card here to act against them</i></div>
            </header>
            {Object.values(opponents).map(o => 
                <CardTarget id={o.id}>
                    <Opponent id={o.id} name={o.name} />
                </CardTarget>
            )}
        </div>
        :
        <p>running uncontested</p>
    )
}

export default OpponentList;