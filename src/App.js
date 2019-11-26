import React from 'react';
import Deckbuilder from 'deckbuilder';
import Card from './Card';
import './App.css';

function prepareCards(deck) {
  for (let id=1; id<7; id++) {
    deck.add({
      id,
      name: Math.random().toString(36).substring(2,10),
      effects: {
        polling: -3
      }
    });
  }
  deck.shuffle();
  deck.draw(3);
}

function App() {
  const deck = new Deckbuilder();
  prepareCards(deck);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      Cards: {deck.drawn.length}
      {deck.drawn.map( card => <Card name={card.name} effects={card.effects} />)}
    </div>
  );
}

export default App;
