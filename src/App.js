import React from 'react';

import { Dashboard, PlayerView, FinalResult } from './components';
import game from './gameplay';

import './App.css';

// this should eventually be UI for a single player
// with actions and information relevant to one candidate
// and summary view for the rest of state;
// a client that reports actions to a central game server
// and receives state updates to pass to presentational components
class App extends React.Component {

  constructor(props) {
    super(props);
    // constants
    this.NOT_READY = "NOT_READY";
    this.IN_PROGRESS = "IN_PROGRESS";
    this.ENDED = "ENDED";
    this.state = {
      ready: false,
      status: null, // constants
      activeId: null,
      logs: ["Loading..."],
      gameState: {}
    }
  }

  log(msg) {
    const previousLogs = this.state.logs
    this.setState({
      logs: [...previousLogs, msg]
    })
  }

  componentDidMount() {
    // connect to game loop
    // so it can initialize vars
    // and provide them as game.state
    // (eventually provide via props)
    if (game.kickoff()) {
      this.setState({
        ready: true,
        status: this.IN_PROGRESS,
        activeId: game.state.turnOrder[game.state.turnNumber],
        logs: [...this.state.logs, "Game state initialized"],
        gameState: game.state
      })
    } else {
      this.log("there was an error")
    };
  }

  componentWillUnmount() {
    // clean up
    // remove any event listeners
    // game = null;
  }

  // handleCardPlayed = ({ card, target }) => {
  handleCardPlayed = (cardId, targetId, sourceId) => {

    // Any card drag within Hand is handled by PlayerView
    // so here we only deal with drag-onto-self or -opponent

    // Placeholder for accepting updated state from server
    this.setState({
      gameState: game.state
    })

    // Apply card to other target
    const validMove = game.playCard( cardId, targetId, sourceId )
    // then
    if (validMove) {
      this.setState({
        activeId: game.state.turnOrder[game.state.turnNumber],
        logs: [...this.state.logs, "Played card " + cardId],
        status: game.state.winner === null ? this.IN_PROGRESS : this.ENDED
      })
    } else {
      // cheating! ... or a bug
      this.setState({
        status: this.NOT_READY
      })
    }
    
  }

  getOtherCandidates(myself) {
    const someCandidates = { ...this.state.gameState.candidatesById };
    delete someCandidates[myself];
    return someCandidates;
  }

  render = (props) => {

    var content = null;

    switch(this.state.status) {
      case this.IN_PROGRESS:
          content = (
            <>
            <Dashboard
              round={game.state.round}
              candidates={Object.values(game.state.candidatesById)}
              logs={this.state.logs}
              gameState={this.state.gameState}
            />
            {game.state.turnOrder.map(cId =>
              <PlayerView
                mode="full"
                active={this.state.activeId === cId }
                candidate={game.state.candidatesById[cId]}
                playCard={this.handleCardPlayed}
                opponents={game.state.turnOrder.filter(i => i !== cId).map(id => game.state.candidatesById[id])}
              />
            )}
            </>
          );
          break;
      case this.ENDED:
        content = (
          <FinalResult
            candidates={Object.values(game.state.candidatesById)}
            winner={null}
          />
        );
        break;
      case this.NOT_READY:
      default:
        content = <p>Not ready or error or something like that. Stupid beta software.</p>
    }

    return <div className="Game">{content}</div>
  }
}

export default App;
