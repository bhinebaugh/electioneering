import React from 'react';

import { Dashboard, PlayerView, FinalResult } from './index';

class GameBoard extends React.Component {

    log(msg) {
        const previousLogs = this.state.logs
        this.setState({
        logs: [...previousLogs, msg]
        })
    }
    
    getOtherCandidates(myself) {
        const someCandidates = { ...this.state.gameState.candidatesById };
        delete someCandidates[myself];
        return someCandidates;
    }

    // show metadata
    // split data and pass to candidates
    // = player identity and resources, cards
    render() {
        if (!this.props.game) {
            return <p>'game' wasn't available as a prop</p>
        }
        var game = this.props.game;
        return (
            <>
            {game.turnOrder.map(cId =>
            <PlayerView
                mode="full"
                active={game.turnNumber == cId }
                candidate={game.candidatesById[cId]}
                playCard={this.props.playCard}
                opponents={game.turnOrder.filter(i => i !== cId).map(id => game.candidatesById[id])}
            />
            )}
            </>
        )
    }

}

export default GameBoard;
  