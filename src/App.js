import React from 'react';
import Deckbuilder from 'deckbuilder';
import Side from './Side';
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
        {id: "0", name: this.generateName(), stats: {polling: 35, funding: 0, media: 0, endorsements: 0, staff: 0, volunteers: 0, enthusiasm: 0, }, characteristics: [], },
        {id: "1", name: this.generateName(), stats: {polling: 35, funding: 0, media: 0, endorsements: 0, staff: 0, volunteers: 0, enthusiasm: 0, }, characteristics: [], },
      ],
      order: []
    }
    const hands = this.deck.deal(2,4);
    this.state.candidates[0].hand = hands["1"];
    this.state.candidates[1].hand = hands["2"];
    this.state.order[0] = this.state.candidates[0].hand.map(c => c.id);
    this.state.order[1] = this.state.candidates[1].hand.map(c => c.id);
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

  applyCardEffects = (candidate, card) => {
    const { effects, attributes } = card;
    for(const effect in effects) {
      if (candidate.stats && typeof candidate.stats[effect] !== "undefined") candidate.stats[effect] += effects[effect]
    }
    attributes.forEach(attr => candidate.characteristics.push(attr));
    this.deck.discard(card.name);
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
        this.updateCardOrder(source.droppableId, source.index)
        const targetId = Number.parseInt(destination.droppableId.substring(1));
        let target = this.state.candidates[targetId];
        this.applyCardEffects(target, theCard)
    }
  }


  render = (props) => (
    <div className="App">
      <header className="App-header">
        <div>
          Cards: {this.deck.drawn.length} Candidates: {this.state.candidates.length} Turn: -
        </div>
      </header>
      <DragDropContext onDragEnd={this.onDragEnd} >
        <Side candidate={this.state.candidates[0]} order={this.state.order[0]} handId={"1"} />
        <Side candidate={this.state.candidates[1]} order={this.state.order[1]} handId={"2"} />
      </DragDropContext>

    </div>
  );
}

export default App;
