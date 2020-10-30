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

// The <Game> root component communicates with the game server 
// (or to a library file in interim) to:
//   1) request initial state
//   2) pass along actions from user 
//   3) record server response as updated state
//   4) propagate updates to child presentational components

class Game extends React.Component {

  // TODO: component state contained and reflects server
  // handle rounds, winner, process, errors
  // while Gameboard and esp PlayerView doesn't need all that

  NOT_READY = "NOT_READY";
  IN_PROGRESS = "IN_PROGRESS";
  ENDED = "ENDED";
  COMM_ERROR = "COMM_ERROR";
  INVALID_MOVE = "INVALID_MOVE";

  state = {
    status: this.NOT_READY,
    logs: ["Loading..."],
    pollingHistory: {},
    data: null
  }

  componentDidMount() {
    this.setState({ logs: [...this.state.logs, "Connecting to game server"]})

    // PROMISE
    game.setup()
    .then(
      data => {
        const pH = {};
        Object.values(data.candidatesById).forEach(c => {
          // next polling number will be pushed onto end of array each time server returns state after playing a card, i.e. twice per round (w/ 2 candidates)
          pH[c.name] = Array.of(c.stats.polling)
        })

        this.setState({
          status: this.IN_PROGRESS,
          logs: [...this.state.logs, "Promise fulfilled: initial state received"],
          pollingHistory: 
          Object.values(data.candidatesById).reduce(
            (total,cnd) => Object.assign(
                total,
                {[cnd.name]: Array.of(cnd.stats.polling)}
              ),
            {}
          ),
          campaignLength: data.round,
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
        // update polling history
        // var candidateId = this.state.data.candidatesById[this.state.data.turnNumber];
        var updatedPollingHistory = {};
        Object.values(data.candidatesById).forEach(c => {
          updatedPollingHistory[c.name] = [...this.state.pollingHistory[c.name], c.stats.polling];
          // updatedPollingHistory[c.name][this.state.data.turnNumber] = c.stats.polling;
        })
        this.setState({
          status: (data.round <= 0 ? this.ENDED : this.IN_PROGRESS),
          data,
          pollingHistory: updatedPollingHistory
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
    var placeholder = {
      "bar": [22]
    };

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
              polling={this.state.pollingHistory}
              campaignLength={this.state.campaignLength}
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
        // fall through to default
        // or <Waiting spinner>
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
              polling={{}}
              campaignLength={0}
            />
          </ErrorMessage>
        );
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
