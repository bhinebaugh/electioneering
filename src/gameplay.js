import Deckbuilder from 'deckbuilder';
// import settings, { surnames, firstNames } from './settings';
import { surnames, firstNames } from './settings';
import { cardSet } from './card-definitions';


const settings = {
	ROUNDS_PER_GAME: 4,
	NUMBER_OF_CANDIDATES: 2,
	BASE_TURNOUT: 50000,
	INITIAL_CARDS: 4,
	INITIAL_POLLING: 20, // starting %
	INITIAL_STAFF: 1,
	INITIAL_VOLUNTEERS: 0,
	INITIAL_FUNDS: 4,
}

// Candidate

// id
// name

// consequences / perception / public:
//   recognition   0 - 100   % of all voters
//   favorability  + / -     ratio of all voters
//   enthusiasm    ???   "hold nose" <----> "cult"
// ==> turnout

// factors pushing public sentiment:
// [usually have a cost or at least requirements]
//   media coverage
//   events / appearances
//   endorsements

// ???
// polling data / surveys
// connections

// enablers / enhancers / means
//   advisors and staff
//   contractors (e.g. ads)
//   surrogates
//   volunteers
//   party support
//   funding

const game = {
  state: {
      candidates: [],
        // polling is a derived value
        // internal demographic stats that determine poll numbers:
        // - recognition / awareness
        // - likeability / favorability
        // - alignment / favorability
        // - winnable / capable / realistic
        // media subtypes: earned, paid, owned, relational/social
      round: settings.ROUNDS_PER_GAME, // counts down to 0, representing weeks until election day
      turn: null,
      winner: null,
  },

  settings: {},
  deck: null,

  kickoff: function() {
    try {
      this.settings = settings;
      // this.state.round = settings.ROUNDS_
      this.state.candidates = this.generateCandidates();
      this.deck = new Deckbuilder();
      this.prepareCards(this.deck);

      this.ROUND_LENGTH = this.state.candidates.length - 1; // allow for a potentially variable number of players
      // characteristics: [ [SERIOUS, 2], [SHADY, 1] ]
      // characteristics: { SERIOUS: 2, SHADY: 1 }
      const hands = this.deck.deal(2,this.settings.INITIAL_CARDS);
      this.state.candidates[0].hand = hands["1"];
      this.state.candidates[1].hand = hands["2"];
      this.state.turn = this.state.candidates[0];
      return true;
    } catch {
      return false;
    }
  },

  generateCandidates: function() {
    const result = [];
    for (let i = 0; i < this.settings.NUMBER_OF_CANDIDATES; i++) {
      var generated = {
          id: i.toString(),
          name: this.generateName(),
          resources: {
            funding: this.settings.INITIAL_FUNDS,
            staff: this.settings.INITIAL_STAFF,
            volunteers: this.settings.INITIAL_VOLUNTEERS
          },
          stats: {
            polling: this.settings.INITIAL_POLLING,
            enthusiasm: 0,
            media: 0,
            endorsements: 0,
            events: 0
          }, 
          characteristics: {}, 
      };
      result.push(generated);
    }
    return result;
  },

  generateName: function() {
    return [firstNames, surnames].map(list => {
      let id = Math.floor(Math.random()*list.length);
      return list[id]
    }).join(" ");
  },
  
  prepareCards: function(deck) {
    cardSet.forEach((card, index) => {
      let derived = Object.assign({}, card, {id: index.toString()});
      deck.add(derived);
    })
    deck.shuffle();
  },

  validatePlay: function(player, target, card) {
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
  },

  playCard: function( draggableId, destination, source ) {
    let candids = this.state.candidates
    let candid = candids[Number.parseInt(source.droppableId)]
    let theCard = candid.hand.find(c => c.id === draggableId)
    const targetId = Number.parseInt(destination.droppableId.substring(1));
    let target = this.state.candidates[targetId];
    if (this.validatePlay(candid, target, theCard)) {
      candid.hand.splice(candid.hand.indexOf(theCard),1)
      this.applyCardEffects(target, theCard)

      // deal replacement card
      const drawNew = this.deck.deal(1,1) // this.deck.draw(1)
      const newCard = drawNew["1"][0]
      candid.hand.push(newCard)

      // updateCardOrder: allow adding a card
      this.state.candidates = candids
      this.nextTurn()
    } else {
      // invalid move; return to hand
      return false
    }
  },

  applyCardEffects: function(candidate, card) {
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
  },

  nextTurn: function() {
    var pointer = this.state.candidates.indexOf(this.state.turn)
    if (pointer === this.ROUND_LENGTH) {
      // next round, reset to first candidate
      // or end game
      let nextRound = this.state.round - 1
      if (nextRound <= 0) { this.endGame() }
      this.state.round = nextRound
      this.state.turn = this.state.candidates[0].id
    } else {
      this.state.turn = this.state.candidates[pointer+1]
    }
  },

  endGame: function() {
    console.log("end of the game")
    var highestPolling = this.state.candidates.reduce( (a,b) => a.polling > b.polling ? a : b)
    this.state.winner = highestPolling.id
  }
}

export default game;