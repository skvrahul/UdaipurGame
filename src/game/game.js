import { NUM_RESOURCES_END, RESOURCES, LARGEST_HERD_BONUS } from "../constants";
import { GAME_NAME } from "../config.js";
import { MoveValidate } from "./moveValidation";

//Defining some Game constants here
let DECK_CONTENTS = {};
DECK_CONTENTS[RESOURCES.diamond] = 6;
DECK_CONTENTS[RESOURCES.gold] = 6;
DECK_CONTENTS[RESOURCES.silver] = 6;
DECK_CONTENTS[RESOURCES.silk] = 8;
DECK_CONTENTS[RESOURCES.spices] = 8;
DECK_CONTENTS[RESOURCES.leather] = 10;
DECK_CONTENTS[RESOURCES.camel] = 11;
DECK_CONTENTS = Object.freeze(DECK_CONTENTS);

const Error = (str) => {
  console.log("ERROR: " + str);
};

const shuffleDeck = (deck) => {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
};
const getWinner = (G) => {
  let p0Score = G.players[0].trade_tokens.reduce((total, token) => {
    return total + token.value;
  }, 0);
  let p1Score = G.players[1].trade_tokens.reduce((total, token) => {
    return total + token.value;
  }, 0);
  let p0Camels = G.players[0].cards.filter(
    (card) => card.type === RESOURCES.camel
  ).length;
  let p1Camels = G.players[1].cards.filter(
    (card) => card.type === RESOURCES.camel
  ).length;

  // Give out token for most camels
  if (p0Camels > p1Camels) {
    p0Score += LARGEST_HERD_BONUS;
  } else if (p1Camels > p0Camels) {
    p1Score += LARGEST_HERD_BONUS;
  } else {
    //TODO: Deal with a tie
  }
  p0Score += G.players[0].T3 * 4;
  p0Score += G.players[0].T4 * 6;
  p0Score += G.players[0].T5 * 8;

  p1Score += G.players[1].T3 * 4;
  p1Score += G.players[1].T4 * 6;
  p1Score += G.players[1].T5 * 8;
  let winner = 0;
  if (p0Score >= p1Score) {
    winner = 0;
  } else {
    winner = 1;
  }
  return { winner: winner, scores: { 0: p0Score, 1: p1Score } };
};
const generateDeck = () => {
  let deck = [];
  let id = 0;
  Object.keys(DECK_CONTENTS).forEach((res) => {
    let count = DECK_CONTENTS[res];
    if (res === RESOURCES.camel) {
      count -= 3;
    }
    for (let i = 0; i < count; i++) {
      deck.push({
        id: id++,
        type: res,
      });
    }
  });
  deck = shuffleDeck(deck);
  for (let i = 0; i < 3; i++) {
    deck.push({
      id: id++,
      type: RESOURCES.camel,
    });
  }
  return deck;
};
export const UdaipurGame = {
  name: GAME_NAME,
  setup: () => {
    const deck = generateDeck();
    var start = {
      board: [],
      tokens: {},
      players: {
        0: { trade_tokens: [], cards: [], T3: 0, T4: 0, T5: 0 },
        1: { trade_tokens: [], cards: [], T3: 0, T4: 0, T5: 0 },
      },
      deck: deck,
    };
    // First put the 3 camels at the top of the deck and then the remaining 2 cards
    for (let i = 0; i < 5; i++) {
      start.board.push(start.deck.pop());
    }
    start.tokens[RESOURCES.silk] = [1, 1, 2, 2, 3, 3, 5];
    start.tokens[RESOURCES.spices] = [1, 1, 2, 2, 3, 3, 5];
    start.tokens[RESOURCES.leather] = [1, 1, 1, 1, 1, 1, 2, 3, 4];
    start.tokens[RESOURCES.gold] = [5, 5, 5, 6, 6];
    start.tokens[RESOURCES.silver] = [5, 5, 5, 5, 5];
    start.tokens[RESOURCES.diamond] = [5, 5, 5, 7, 7];

    // Deal 5 cards in alternating order to each player
    for (let i = 0; i < 5; i++) {
      start.players[0].cards.push(start.deck.pop());
      start.players[1].cards.push(start.deck.pop());
    }
    // Adding deckSize so that the Deck can be stripped in the future
    // deckSize will get updated after turn onEnd
    start.deckSize = start.deck.length;
    return start;
  },
  //playerView: PlayerView.STRIP_SECRETS,
  moves: {
    takeOne: (G, ctx, id) => {
      // Only write to game state if its a valid move!
      const validMove = MoveValidate.takeOne(G, ctx, id);
      if (validMove.valid) {
        //Using slice to return new arrays rather than references
        const p = ctx.currentPlayer;
        let board = G.board.slice();
        let cardToTake = board.filter((card) => card.id === id)[0];
        let newPlayerCards = G.players[p].cards.slice();
        newPlayerCards.push(cardToTake);
        G.players[p].cards = newPlayerCards;
        if (G.deck.length > 0) {
          board.push(G.deck.pop());
          board = board.filter((card) => card.id !== cardToTake.id);
        }
        G.board = board;
        ctx.events.endTurn();
      } else {
        return Error(validMove.message);
      }
    },
    takeMany: (G, ctx, takeIDs, replaceIDs) => {
      // Only write to game state if its a valid move!
      const validate = MoveValidate.takeMany(G, ctx, takeIDs, replaceIDs);
      if (validate.valid) {
        const p = ctx.currentPlayer;
        // Cards to remove from the deck
        const cardsToRemove = G.board.filter(
          (card) => takeIDs.includes(card.id) && card.type !== RESOURCES.camel //Cannot remove camels from the deck
        );

        // Deck after removing the cards
        let newBoard = G.board.filter((card) => !takeIDs.includes(card.id));
        const cardsToReplace = G.players[p].cards.filter((card) =>
          replaceIDs.includes(card.id)
        );
        let newPlayerCards = G.players[p].cards.filter(
          (card) => !replaceIDs.includes(card.id)
        );
        newBoard.push(...cardsToReplace);
        newPlayerCards.push(...cardsToRemove);
        G.players[p].cards = newPlayerCards;
        G.board = newBoard;
        console.log("Ending turn");
        ctx.events.endTurn();
      } else {
        return Error(validate.message);
      }
    },
    takeCamels: (G, ctx) => {
      const validMove = MoveValidate.takeCamels(G, ctx);
      if (validMove.valid) {
        const p = ctx.currentPlayer;
        let newPlayerCards = G.players[p].cards;
        let newBoard = G.board.filter((card) => card.type !== RESOURCES.camel);
        let camels = G.board.filter((card) => card.type === RESOURCES.camel);
        const numCamels = camels.length;
        while (camels.length > 0) {
          newPlayerCards.push(camels.pop());
        }
        for (let i = 0; i < numCamels; i++) {
          if (G.deck.length > 0) {
            newBoard.push(G.deck.pop());
          }
        }
        G.players[p].cards = newPlayerCards;
        G.board = newBoard;
        console.log("Ending turn");
        ctx.events.endTurn();
      } else {
        return Error(validMove.message);
      }
    },
    trade: (G, ctx, tradeIDs) => {
      const validMove = MoveValidate.trade(G, ctx, tradeIDs);
      // Only write to game state if its a valid move!
      if (validMove.valid) {
        const p = ctx.currentPlayer;
        const cardsToTrade = G.players[p].cards.filter((card) =>
          tradeIDs.includes(card.id)
        );
        const newPlayerCards = G.players[p].cards.filter(
          (card) => !tradeIDs.includes(card.id)
        );
        const cardType = cardsToTrade[0].type;
        let tradeSize = cardsToTrade.length;
        for (let i = 0; i < tradeSize; i++) {
          G.players[p].trade_tokens.push({
            resource: cardType,
            value: G.tokens[cardType].pop(),
          });
        }
        if (tradeSize === 3) {
          G.players[p].T3 += 1;
        } else if (tradeSize === 4) {
          G.players[p].T4 += 1;
        } else if (tradeSize >= 5) {
          G.players[p].T5 += 1;
        }
        G.players[p].cards = newPlayerCards;
        console.log("Ending turn");
        ctx.events.endTurn();
      } else {
        return Error(validMove.message);
      }
    },
  },
  turn: {
    onEnd: (G, ctx) => {
      //Update states here like deck size
      G.deckSize = G.deck.length;
    },
  },
  endIf: (G, ctx) => {
    // Victory Condition here
    if (G.deck.length <= 0) {
      console.log("Ending game since we are out of cards!");
      return getWinner(G);
    }
    if (
      Object.values(G.tokens).filter((res) => res.length > 0).length <=
      NUM_RESOURCES_END
    ) {
      console.log(
        "Ending game since we have reached the minimum number of trading token stacks!"
      );
      return getWinner(G);
    }
  },
};
