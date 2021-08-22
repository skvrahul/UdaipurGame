import {
  RESOURCES,
  MAX_HAND_SIZE,
  MIN_RARE_TRADE,
  RARE_RESOURCES,
} from "../constants";

export const checkPlayerHand = (hand) => {
  const goods = hand.filter((card) => card.type !== RESOURCES.camel);
  if (goods.length > MAX_HAND_SIZE) {
    return false;
  } else {
    return true;
  }
};
const result = (valid, message) => {
  if (!valid) {
    console.log("Invalid move : ", message);
  }
  return { valid: valid, message: message };
};

/**
 *  MoveValidate is an object
 *  containing a set of independent, stateless functions
 *  for validating moves.
 *  This validation aims to separate a large chunk of validation
 *  that is required to be done at both the server side and the client side
 *
 *  IDEALLY, these validation functions should not contain any secrets, so
 *  they should be written to be able to function on the Stripped PlayerView
 */
export const MoveValidate = {
  takeOne: (G, ctx, id) => {
    if (typeof id !== "number") {
      return result(false, "Select 1 and only 1 card for takeOne");
    }
    const p = ctx.currentPlayer;
    //Using slice to return new arrays rather than references
    let board = G.board.slice();

    let cardToTake = board.filter((card) => card.id === id)[0];
    if (!cardToTake) {
      return result(false, "Card with that ID does not exist!");
    }
    if (cardToTake.type === RESOURCES.camel) {
      return result(false, "You can't take a camel!");
    }
    let newPlayerCards = G.players[p].cards.slice();
    newPlayerCards.push(cardToTake);
    if (checkPlayerHand(newPlayerCards)) {
      return result(true, "ok");
    } else {
      return result(false, "Too many cards in your hand for doing that move!");
    }
  },
  takeMany: (G, ctx, takeIDs, replaceIDs) => {
    const p = ctx.currentPlayer;
    if (takeIDs.length !== replaceIDs.length) {
      return result(false, "You have to replace as many as you take!");
    }
    if (takeIDs.length <= 1) {
      return result(false, "You have to take atleast 2 cards with replacement");
    }
    // Cards to remove from the deck
    const cardsToRemove = G.board.filter(
      (card) => takeIDs.includes(card.id) && card.type !== RESOURCES.camel //Cannot remove camels from the deck
    );

    if (cardsToRemove.length !== takeIDs.length) {
      return result(
        false,
        "Length mismatch(Perhaps camels were attempted to be removed from the board!)"
      );
    }

    let newPlayerCards = G.players[p].cards.filter(
      (card) => !replaceIDs.includes(card.id)
    );
    newPlayerCards.push(...cardsToRemove);
    if (checkPlayerHand(newPlayerCards)) {
      return result(true, "ok");
    } else {
      return result(false, "Too many cards in your hand for doing that move!");
    }
  },
  trade: (G, ctx, tradeIDs) => {
    const p = ctx.currentPlayer;
    const cardsToTrade = G.players[p].cards.filter((card) =>
      tradeIDs.includes(card.id)
    );
    if (cardsToTrade.length === 0) {
      return result(false, "Select atleast one card to trade");
    }
    const cardType = cardsToTrade[0].type;
    if (!cardsToTrade.every((card) => card.type === cardType)) {
      return result(
        false,
        "You can only trade cards of a one resource in a turn"
      );
    }
    if (cardType === RESOURCES.camel) {
      return result(false, "You cannot trade camels!");
    }
    if (cardsToTrade.length !== tradeIDs.length) {
      return result(false, "All cards traded have to be of the same resource!");
    }
    if (
      RARE_RESOURCES.includes(cardType) &&
      cardsToTrade.length < MIN_RARE_TRADE
    ) {
      return result(
        false,
        "Cannot trade less than {0} cards for a rare resource!".replace(
          "{0}",
          MIN_RARE_TRADE
        )
      );
    }
    if (G.tokens[cardType].length === 0) {
      return result(
        false,
        "No tokens in the market to trade that resource!"
      );
    }
    return result(true, "OK");
  },
  takeCamels: (G, ctx) => {
    let camels = G.board.filter((card) => card.type === RESOURCES.camel);
    const numCamels = camels.length;
    if (numCamels === 0) {
      return result(false, "No camels on the board! Can't make that move");
    }
    return result(true, "OK");
  },
};
