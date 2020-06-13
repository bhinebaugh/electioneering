import React from 'react';
import Deckbuilder from 'deckbuilder';
import Side from './Side';
import Polls from './Polls';
import FinalResult from './FinalResult';
import { surnames, firstNames } from './settings';
import { cardSet } from './card-definitions';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.deck = new Deckbuilder();
    this.prepareCards(this.deck);
    this.state = {
      candidates: [
        // media subtypes: earned, paid, owned, relational/social
        {id: "0", name: this.generateName(), resources: { funding: 10, staff: 2, volunteers: 0 }, stats: { polling: 35, media: 0, endorsements: 0, events: 0 }, characteristics: {}, },
        {id: "1", name: this.generateName(), resources: { funding: 10, staff: 2, volunteers: 0 }, stats: { polling: 35, media: 0, endorsements: 0, events: 0 }, characteristics: {}, },
      ],
      order: [],
      round: 4, // counts down to 0, representing weeks until election day
      turn: null,
    }
    // characteristics: [ [SERIOUS, 2], [SHADY, 1] ]
    // characteristics: { SERIOUS: 2, SHADY: 1 }
    const hands = this.deck.deal(2,4);
    this.state.candidates[0].hand = hands["1"];
    this.state.candidates[1].hand = hands["2"];
    this.state.order[0] = this.state.candidates[0].hand.map(c => c.id);
    this.state.order[1] = this.state.candidates[1].hand.map(c => c.id);
    this.state.turn = this.state.candidates[0]
  }

  generateName() {
    return [firstNames, surnames].map(list => {
      let id = Math.floor(Math.random()*list.length);
      return list[id]
    }).join(" ")
  }
  
  prepareCards(deck) {
    cardSet.forEach((card, index) => {
      let derived = Object.assign({}, card, {id: index.toString()})
      deck.add(derived)
    })
    deck.shuffle();
  }
  
  updateCardOrder = (id, sourceIndex, destinationIndex=-1) => {
    let target = Number.parseInt(id);
    let newOrder = Array.from(this.state.order);
    let [removedCard] = newOrder[target].splice(sourceIndex, 1);
    if (destinationIndex >= 0) newOrder[target].splice(destinationIndex, 0, removedCard);
    this.setState({
      order: newOrder
    });
  }

  validatePlay = (player, target, card) => {
    // is target allowed for this card?
    // player === target ?
    if (!card.requirements) {
      return true
    }
    for (const req in card.requirements) {
      if (card.requirements[req] > player.resources[req]) {
        console.log("didn't meet reqt for", req)
        return false
      }
    }
    return true
  }

  applyCardEffects = (candidate, card) => {
    const { effects, attributes } = card;
    // TODO: allow cards to change resource amounts
    const resourceNames = Object.keys(candidate.resources)
    for(const effect in effects) {
      if (resourceNames.includes(effect)) {
        candidate.resources[effect] += effects[effect]
      } else if (candidate.stats && typeof candidate.stats[effect] !== "undefined") {
        candidate.stats[effect] += effects[effect]
      }
    }
    attributes.forEach(attr => {
      if (candidate.characteristics.hasOwnProperty(attr)) {
        // catch NaN
        candidate.characteristics[attr]++
      } else {
        candidate.characteristics[attr] = 1
      }
    })
    this.deck.discard(card.name);
  }

  nextTurn() {
    var pointer = this.state.candidates.indexOf(this.state.turn)
    if (pointer === this.state.candidates.length - 1) {
      // next round, reset to first candidate
      // or end game
      let nextRound = this.state.round - 1
      if (nextRound <= 0) { this.endGame() }
      this.setState({
        round: nextRound,
        turn: this.state.candidates[0],
      })
    } else {
      this.setState({turn: this.state.candidates[pointer+1]})
    }
  }

  endGame() {
    console.log("end of the game")
  }

  onDragEnd = result => {
    const { draggableId, destination, source } = result;

    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
        // rearranging card order within current hand
        if (source.index === destination.index) return;
        this.updateCardOrder(destination.droppableId, source.index, destination.index)
    } else {
        // card was played to another area
        let candid = this.state.candidates[Number.parseInt(source.droppableId)]
        let theCard = candid.hand.find(c => c.id === draggableId)
        // does candidate meet reqs to play card?
        const targetId = Number.parseInt(destination.droppableId.substring(1));
        let target = this.state.candidates[targetId];
        if (this.validatePlay(candid, target, theCard)) {
          this.updateCardOrder(source.droppableId, source.index)
          this.applyCardEffects(target, theCard)
          this.nextTurn()
        } else {
          // invalid move; return to hand
          return false
        }
    }
  }


  render = (props) => (
    <div className="App">
      <DragDropContext onDragEnd={this.onDragEnd} >
        <Side candidate={this.state.candidates[0]} order={this.state.order[0]} handId={"1"} currentPlayer={this.state.turn === this.state.candidates[0]}/>
        <Polls round={this.state.round} candidates={this.state.candidates} />
        <Side candidate={this.state.candidates[1]} order={this.state.order[1]} handId={"2"} currentPlayer={this.state.turn === this.state.candidates[1]}/>
      </DragDropContext>
      {!this.state.round && <FinalResult candidates={this.state.candidates} />}
    </div>
  );
}

export default App;
