import React from 'react';

import PlayerView from './PlayerView';
import Polls from './Polls';
import FinalResult from './FinalResult';
import game from './gameplay';

import './App.css';

// this should eventually be UI for a single player
// with actions and information relevant to one candidate
// and summary view for the rest of state;
// a client that reports actions to a central game server
class App extends React.Component {

  constructor(props) {
    super(props);
    // keep any state locally?
    // probably card order
    this.state = {
      order: [],
      ready: false,
      activeId: null,
    }
  }

  componentDidMount() {
    // connect to game loop
    // so it can initialize vars
    // and provide them as game.state
    // (eventually provide via props)
    if (game.kickoff()) {
      console.log("game state initiated")
      this.setState({
        ready: true,
        activeId: game.state.turn,
      })
    } else {
      console.log("there was an error")
    };
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

    if (source.droppableId === destination.droppableId) {
        // Rearrange card order within current hand
        if (source.index === destination.index) return;
        this.updateCardOrder(destination.droppableId, source.index, destination.index)
    } else {
        // Apply card to other target
        game.playCard( draggableId, destination, source )
    }
  }


  // render = ({ round, candidates, gameOver, winner }) => (
  render = (props) => (
    <div className="Game">
      {/* {candidates.map(c => <Player />)} */}
      { this.state.ready ?
        <PlayerView
          mode="full"
          active={this.state.activeId == game.state.candidates[0].id}
          candidate={game.state.candidates[0]}
          handleDragEnd={this.onDragEnd}
        />
        :
        <p>not ready</p>
      }
    </div>
  );
}

export default App;
      // <FinalResult
      //   active={gameOver}
      //   candidates={candidates}
      //   winner={winner}
      // />

/* 
<Dashboard>
  <Polling></Polling>
  <State />
  <Log />
</Dashboard>

<Player view="primary">
  <Candidate />
  <Cards />
</Player>

<Player view="summary" />


      <DragDropContext onDragEnd={this.onDragEnd}>

        {
          this.state.ready ? 
            <>
            <Side candidate={game.state.candidates[0]} order={null} handId={"1"} inactive={game.state.turn !== game.candidates[0]}/>
    
            <Polls round={game.state.round} candidates={game.state.candidates} />
    
            <Side candidate={game.state.candidates[1]} order={null} handId={"2"} inactive={game.state.turn !== game.state.candidates[1]}/>
            </>
          : <p>waiting for set up to complete</p>
        }

      </DragDropContext>

*/