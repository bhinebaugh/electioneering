import React from 'react';
import Deckbuilder from 'deckbuilder';
import Side from './Side';
import './App.css';

function prepareCards(deck) {
  for (let id=1; id<11; id++) {
    deck.add({
      id,
      name: Math.random().toString(36).substring(2,10),
      effects: {
        polling: 1 + Math.floor(Math.random()*5),
        turnout: 1 + Math.floor(Math.random()*3),
        funding: 1 + Math.floor(Math.random()*50),
      }
    });
  }
  deck.shuffle();
  // deck.draw(3);
}

function App() {
  const deck = new Deckbuilder();
  prepareCards(deck);
  let hands = deck.deal(2,4);
  let candidates = [
    {name: 'player1', stats: {polling: 50, funding: 0}, },
    {name: 'player2', stats: {polling: 50, funding: 0}, },
  ]

  return (
    <div className="App">
      <header className="App-header">
          Cards: {deck.drawn.length}
          Candidates: -
      </header>
      <Side candidate={candidates[0]} handId={"1"} hand={hands['1']} />
      <Side candidate={candidates[1]} handId={"2"} hand={hands['2']} />
    </div>
  );
}

export default App;
