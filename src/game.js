import { RESOURCES, RARE_RESOURCES } from "./constants";
import { GAME_NAME } from "./config";

//Defining some Game constants here
const MIN_RARE_TRADE = 2;
const MAX_HAND_SIZE = 7;
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
const getWinner = (G) => {};
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
const checkPlayerHand = (hand) => {
  const goods = hand.filter((card) => card.type !== RESOURCES.camel);
  if (goods.length > MAX_HAND_SIZE) {
    return false;
  } else {
    return true;
  }
};
export const UdaipurGame = {
  name: GAME_NAME,
  setup: () => {
    const deck = generateDeck();
    var start = {
      board: [],
      tokens: {},
      players: {
        0: { score: 0, cards: [], T3: 0, T4: 0, T5: 0 },
        1: { score: 0, cards: [], T3: 0, T4: 0, T5: 0 },
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
      const p = ctx.currentPlayer;

      //Using slice to return new arrays rather than references
      let board = G.board.slice();

      let cardToTake = board.filter((card) => card.id === id)[0];
      if (!cardToTake) {
        return Error("Card with that ID does not exist!");
      }
      if (cardToTake.type === RESOURCES.camel) {
        return Error("You can't take a camel!");
      }

      let newPlayerCards = G.players[p].cards.slice();
      newPlayerCards.push(cardToTake);

      // Only write to game state if its a valid move!
      if (checkPlayerHand(newPlayerCards)) {
        G.players[p].cards = newPlayerCards;
        // Replenish with card from the deck
        if (G.deck.length > 0) {
          board.push(G.deck.pop());
          board = board.filter((card) => card.id !== cardToTake.id);
        }
        G.board = board;
        console.log("Ending turn");
        ctx.events.endTurn();
      } else {
        return Error("Too many cards in players hands for doing that move!");
      }
    },
    takeMany: (G, ctx, takeIDs, replaceIDs) => {
      const p = ctx.currentPlayer;
      if (takeIDs.length !== replaceIDs.length) {
        return Error("You have to replace as many as you take!");
      }
      if (takeIDs.length <= 1) {
        return Error("You have to take atleast 2 cards with replacement");
      }
      // Cards to remove from the deck
      const cardsToRemove = G.board.filter(
        (card) => takeIDs.includes(card.id) && card.type !== RESOURCES.camel //Cannot remove camels from the deck
      );

      if (cardsToRemove.length !== takeIDs.length) {
        return Error(
          "Length mismatch(Perhaps camels were attempted to be removed from the board!)"
        );
      }

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

      // Only write to game state if its a valid move!
      // TODO: Check deck also
      if (checkPlayerHand(newPlayerCards)) {
        G.players[p].cards = newPlayerCards;
        G.board = newBoard;
        console.log("Ending turn");
        ctx.events.endTurn();
      } else {
        return Error("Too many cards in players hands for doing that move!");
      }
    },

    takeCamels: (G, ctx) => {
      const p = ctx.currentPlayer;
      let newPlayerCards = G.players[p].cards;
      let newBoard = G.board.filter((card) => card.type !== RESOURCES.camel);
      let camels = G.board.filter((card) => card.type === RESOURCES.camel);
      const numCamels = camels.length;
      if (numCamels === 0) {
        return Error("No camels on the board! Can't make that move");
      }
      while (camels.length > 0) {
        newPlayerCards.push(camels.pop());
      }
      if (checkPlayerHand(newPlayerCards)) {
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
        return Error("Too many cards in players hands for doing that move!");
      }
    },

    trade: (G, ctx, tradeIDs) => {
      const p = ctx.currentPlayer;
      const cardsToTrade = G.players[p].cards.filter((card) =>
        tradeIDs.includes(card.id)
      );
      if (cardsToTrade.length === 0) {
        return Error("Not enough cards to trade");
      }
      const cardType = cardsToTrade[0].type;
      console.log("ct");
      console.log(cardType);
      console.log(cardsToTrade);
      if (!cardsToTrade.every((card) => card.type === cardType)) {
        return Error("Inconsistent cardType for trading");
      }
      if (cardType === RESOURCES.camel) {
        return Error("You cannot trade camels!");
      }
      const newPlayerCards = G.players[p].cards.filter(
        (card) => !tradeIDs.includes(card.id)
      );
      if (cardsToTrade.length !== tradeIDs.length) {
        return Error("All cards traded have to be of the same resource!");
      }
      if (
        RARE_RESOURCES.includes(cardType) &&
        cardsToTrade.length < MIN_RARE_TRADE
      ) {
        return Error(
          "Cannot trade less than {0} cards for a rare resource!".replace(
            "{0}",
            MIN_RARE_TRADE
          )
        );
      }
      if (G.tokens[cardType].length < cardsToTrade.length) {
        return Error("Not enough tokens in the market to trade that resource!");
      }
      if (checkPlayerHand(newPlayerCards)) {
        // Only write to game state if its a valid move!
        let tradeSize = cardsToTrade.length;
        for (let i = 0; i < tradeSize; i++) {
          G.players[p].score += G.tokens[cardType].pop();
        }
        if (tradeSize === 3) {
          //TODO: Give players 3T
        } else if (tradeSize === 4) {
          //TODO: Give players 4T
        } else if (tradeSize >= 5) {
          //TODO: Give players 5T
        }

        G.players[p].cards = newPlayerCards;
        console.log("Ending turn");
        ctx.events.endTurn();
      } else {
        return Error("Too many cards in players hands for doing that move!");
      }
    },
  },
  turn: {
    onEnd: (G, ctx) => {
      //Update states here like deck size
      G.deckSize = G.deck.length;
    },
  },
  endif: (G, ctx) => {
    // Victory Condition here

    if (G.deck.length <= 0) {
      return getWinner(G);
    }
    if (G.tokens.filter((res) => res.length >= 0).length <= 3) {
      return getWinner(G);
    }
  },
};
/**
 *      TODO BOARD
 *  - Replace cards in place (do not shift unreplaced cards)  [ ]
 *  - Give players 3T, 4T, 5T tokens  [ ]
 *  - Give Players resource sale tokens  [ ]
 *  - Give player largest camel herd token  [ ]
    - Check if more than 3 resource tokens are exhausted in 'endif' [X]
 */
