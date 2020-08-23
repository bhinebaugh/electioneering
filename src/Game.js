import React from 'react';

import { Dashboard, GameBoard, FinalResult } from './components';
import game from './lib/gameplay';

import './base.css';


const ErrorMessage = (props) => (
  <div>
    <p>Not ready or error or something like that. Stupid beta software.</p>
    {props.children}
  </div>
);

// This component serves to request initial state 
// and send along actions to a central game server
// and collect response to update child presentational components
class Game extends React.Component {

  NOT_READY = "NOT_READY";
  IN_PROGRESS = "IN_PROGRESS";
  ENDED = "ENDED";
  COMM_ERROR = "COMM_ERROR";
  INVALID_MOVE = "INVALID_MOVE";

  state = {
    status: this.NOT_READY,
    logs: ["Loading..."],
    data: null
  }

  componentDidMount() {
    this.setState({ logs: [...this.state.logs, "Connecting to game server"]})

    // PROMISE
    game.setup()
    .then(
      data => {
        this.setState({
          status: this.IN_PROGRESS,
          logs: [...this.state.logs, "Promise fulfilled: initial state received"],
          data
        })
      },
      error => {
        this.setState({
          status: this.COMM_ERROR,
          logs: [...this.state.logs, "Promise error: "+error],
        })
      }
    )
  }

  componentWillUnmount() {
    // clean up
    // remove any event listeners
  }

  handleCardPlayed = (cardId, targetId, sourceId) => {
    var action = "Play card " + cardId;
    this.setState({ logs: [...this.state.logs, action ]})
    game.playCard(cardId, targetId, sourceId)
    .then(
      data => {
        this.setState({
          status: (data.round <= 0 ? this.ENDED : this.IN_PROGRESS),
          data
        })
      },
      error => {
        this.setState({
          status: this.INVALID_MOVE,
          logs: [...this.state.logs, "Server rejected move as invalid"]
        })
      }
    )
  }
  
  render = (props) => {

    var content = null;

    switch(this.state.status) {
      case this.IN_PROGRESS:
      case this.INVALID_MOVE:
          content = (
            <>
            <Dashboard
              round={this.state.data.round}
              candidates={Object.values(this.state.data.candidatesById)}
              logs={this.state.logs}
              gameState={this.state.data}
            />

            <GameBoard
              game={this.state.data}
              playCard={this.handleCardPlayed}
            />
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
      case this.COMM_ERROR:
      default:
        content = (
          <ErrorMessage text={"problem encountered"}>
            <p>{this.state.status}</p>
            
            <Dashboard
              round={null}
              candidates={[]}
              logs={this.state.logs}
              gameState={{}}
            />
          </ErrorMessage>
        );
        // or <Waiting spinner>
    }

    return (
      <div
        className="Game"
      >
          {content}
      </div>
    )
  }

}

export default Game;
