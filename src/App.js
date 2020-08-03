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
      order: [], // TODO: card order
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
    game = null;
  }
  
  updateCardOrder(id, sourceIndex, destinationIndex=-1) {
    let target = Number.parseInt(id);
    let newOrder = Array.from(this.state.order);
    let [removedCard] = newOrder[target].splice(sourceIndex, 1); // or filter?
    if (destinationIndex >= 0) newOrder[target].splice(destinationIndex, 0, removedCard);
    this.setState({
      order: newOrder
    });
  }

  onDragEnd = result => {
    const { draggableId, destination, source } = result;

    if (!destination) {
        return;
    }

    const extracted = game.state
    this.setState({
      gameState: extracted
    })

    if (source.droppableId === destination.droppableId) {
        // Rearrange card order within current hand
        if (source.index === destination.index) return;
        this.updateCardOrder(destination.droppableId, source.index, destination.index)
    } else {
        // Apply card to other target
        const validMove = game.playCard( draggableId, destination, source )
        // then
        if (validMove) {
          this.setState({
            activeId: game.state.turnOrder[game.state.turnNumber],
            logs: [...this.state.logs, "Played card " + draggableId],
            status: game.state.winner === null ? this.IN_PROGRESS : this.ENDED
          })
        } else {
          // cheating! ... or a bug
          this.setState({
            status: this.NOT_READY
          })
        }


    }
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
                handleDragEnd={this.onDragEnd}
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
