import React, { Component } from "react";
import PlayerMoves from "./playerMoves";
import Popup from "react-popup";
import TokenStack from "./tokenStack";
import TurnIndicator from "./turnIndicator";
import { RESOURCES, RARE_RESOURCES } from "../constants";
import "./styles/cards.css";
import "./styles/boardLayout.css";
import "./styles/resultsPage.css";
import BoardCards from "./boardCards";
import PlayerCards from "./playerCards";
import { MoveValidate } from "../game/moveValidation";
import SpecialTokens from "./specialTokens";

class UdaipurBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSelected: [],
      handSelected: [],
    };
  }

  /**
   *  Methods to handle UI events and buttons such as:
   *    - Handling card click on Hand
   *    - Handling card click on the Board
   */

  alertError(error) {
    Popup.alert(error);
  }
  clearSelection = () => {
    this.setState({ boardSelected: [], handSelected: [] });
  };
  handleHandSelect = (cardID) => {
    let handSelected = this.state.handSelected.slice();
    const p = this.props.ctx.currentPlayer;
    let playerCards = this.props.G.players[p].cards.map((c) => c.id);
    handSelected = handSelected.filter((id) => playerCards.includes(id));
    if (!handSelected.includes(cardID)) {
      handSelected.push(cardID);
    } else {
      handSelected = handSelected.filter((x) => x !== cardID);
    }
    this.setState({ handSelected });
  };
  handleBoardSelect = (cardID) => {
    let boardSelected = this.state.boardSelected.slice();
    if (!boardSelected.includes(cardID)) {
      boardSelected.push(cardID);
    } else {
      boardSelected = boardSelected.filter((x) => x !== cardID);
    }
    this.setState({ boardSelected });
  };

  /**
   *  Methods to handle various player actions
   *    - Do necessary checks on client end (TODO)
   *    - Notify user if action is invalid (WIP)
   *    - Dispatch move to server
   *    - Update UI wherever required
   */
  handleTrade = () => {
    console.log("Handling trade!");
    console.log(this.state.handSelected);
    const { G, ctx } = this.props;
    const validate = MoveValidate.trade(G, ctx, this.state.handSelected);
    let tradeToken = -1;
    if (validate.valid) {
      if (this.state.handSelected.length === 3) {
        tradeToken = 3;
      } else if (this.state.handSelected.length === 4) {
        tradeToken = 4;
      } else if (this.state.handSelected.length >= 5) {
        tradeToken = 5;
      }
      this.props.moves.trade(this.state.handSelected);
      this.setState({ tradeToken: tradeToken });
    } else {
      return this.alertError(validate.message);
    }
    this.clearSelection();
  };
  handleTakeOne = () => {
    const { G, ctx } = this.props;
    const validate = MoveValidate.takeOne(G, ctx, this.state.boardSelected[0]);

    // Some validation before performing the move
    if (this.state.boardSelected.length !== 1) {
      this.clearSelection();
      return this.alertError(
        "Please select only 1 card to take from the Board!"
      );
    } else if (!validate.valid) {
      this.clearSelection();
      return this.alertError(validate.message);
    } else {
      this.props.moves.takeOne(this.state.boardSelected[0]);
      this.clearSelection();
    }
  };
  handleTakeCamels = () => {
    const board = this.props.G.board;
    const numCamelsOnBoard = board.filter(
      (card) => card.type === RESOURCES.camel
    ).length;
    if (numCamelsOnBoard <= 0) {
      this.clearSelection();
      return this.alertError(
        "Not enough camels on the board to perform that move!"
      );
    }
    this.props.moves.takeCamels();
    this.clearSelection();
  };
  handleTakeMany = () => {
    console.log("Handling take many!");
    const { G, ctx } = this.props;
    const validate = MoveValidate.takeMany(
      G,
      ctx,
      this.state.boardSelected,
      this.state.handSelected
    );
    if (validate.valid) {
      this.props.moves.takeMany(
        this.state.boardSelected,
        this.state.handSelected
      );
    } else {
      return this.alertError(validate.message);
    }
    this.clearSelection();
  };

  getActiveButtons = () => {
    const G = this.props.G;
    const p = this.props.ctx.currentPlayer;
    const iAmActive = this.props.ctx.currentPlayer === this.props.playerID;
    console.log(this.props.ctx.currentPlayer, " ---- ", this.props.playerID);
    let active = {
      takeCamels: true,
      takeOne: true,
      takeMany: true,
      trade: true,
    };
    // If this player isn't the active player, then deactivate all the buttons
    if (!iAmActive) {
      let active = {
        takeCamels: false,
        takeOne: false,
        takeMany: false,
        trade: false,
      };
      return active;
    }
    // Check if camels can be taken from the board
    const numCamels = G.board.filter((card) => card.type === RESOURCES.camel)
      .length;
    if (numCamels === 0) {
      active.takeCamels = false;
    }

    // Check if one resource card can be taken from the board without replacement
    const numBoardResources = G.board.filter(
      (card) => card.type !== RESOURCES.camel
    ).length;
    if (numBoardResources === 0) {
      active.takeOne = false;
    }
    const numPlayerResources = G.players[p].cards.filter(
      (card) => card.type !== RESOURCES.camel
    ).length;
    if (numPlayerResources >= 7) {
      active.takeOne = false;
    }

    // Check if many resource cards can be taken from the board with replacement
    if (numBoardResources === 0) {
      active.takeMany = false;
    }
    if (G.players[p].cards.length === 0) {
      active.takeMany = false;
    }

    // Check if player has anything to trade
    if (numPlayerResources === 0) {
      active.trade = false; // No resources available to trade
    }

    // If player has ONLY rare resources, check if he has enough of any given kind
    const playerResources = G.players[p].cards.filter(
      (card) => card.type !== RESOURCES.camel
    );
    const numCommonResources = playerResources.filter(
      (card) => !RARE_RESOURCES.includes(card.type)
    ).length;
    if (numCommonResources === 0) {
      console.log("Only rare resources in the hand");
      let RR_DICT = {};
      playerResources.forEach((card) => {
        if (card.type in RR_DICT) {
          RR_DICT[card.type] += 1;
        } else {
          RR_DICT[card.type] = 1;
        }
      });
      let flag = false;
      for (let [, count] of Object.entries(RR_DICT)) {
        if (count >= 2) {
          flag = true;
          break;
        }
      }
      active.trade = flag;
    }
    return active;
  };
  getOtherPlayer = (p) => {
    if (p === 0 || p === "0") {
      return 1;
    } else {
      return 0;
    }
  };
  getResultsPage = (gameOver, playerID) => {
    const iWon = String(gameOver.winner) === String(playerID);
    return (
      <div class="full_height">
        <div class="title">
          <h1>Udaipur</h1>
        </div>
        <div>
          {iWon ? "Congratulations you have won!" : "I'm afraid you have lost"}
        </div>
        <div class="scoreboard">
          <div
            class={
              "score-item " +
              (String(gameOver.winner) === "0" ? "winner " : "loser ") +
              (playerID === "0" ? "me" : "")
            }
          >
            <span class="username">
              {playerID === "0" ? "You" : "Opponent"}
            </span>
            <span class="score">{gameOver.scores[0]}</span>
          </div>
          <div
            class={
              "score-item " +
              (String(gameOver.winner) === "1" ? "winner " : "loser ") +
              (playerID === "1" ? "me" : "")
            }
          >
            <span class="username">
              {playerID === "1" ? "You" : "Opponent"}
            </span>
            <span class="score"> {gameOver.scores[1]}</span>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const playerID = this.props.playerID;
    const opponentID = this.getOtherPlayer(playerID);
    const currentPlayer = this.props.ctx.currentPlayer;
    const gameOver = this.props.ctx.gameover;
    if (gameOver) {
      return this.getResultsPage(gameOver, playerID);
    }
    const boardCards = this.props.G.board;
    const myCards = this.props.G.players[playerID].cards;
    const opponentCards = this.props.G.players[opponentID].cards;
    const deckLength = this.props.G.deckSize;
    const resourceTokens = this.props.G.tokens;
    return (
      <div className="container full_height">
        <div className="vsplit left">
          {/* Common Resources tokens */}
          {Object.keys(resourceTokens)
            .filter((key) => !RARE_RESOURCES.includes(key))
            .map((key) => (
              <TokenStack
                id={key}
                resource={key}
                coinValues={resourceTokens[key]}
              ></TokenStack>
            ))}
          {/* Special tokens (3T, 4T, 5T and largest-herd) */}
          <SpecialTokens tradeToken={this.state.tradeToken} />

          {/* Rare Resources tokens */}
          {Object.keys(resourceTokens)
            .filter((key) => RARE_RESOURCES.includes(key))
            .map((key) => (
              <TokenStack
                id={key}
                resource={key}
                coinValues={resourceTokens[key]}
              ></TokenStack>
            ))}
        </div>
        <div className="vsplit right">
          <div className="hsplit top">
            <PlayerCards
              cards={opponentCards}
              selected={[]}
              faceUp={false}
              opponent={true}
              onClick={null}
            ></PlayerCards>
            <BoardCards
              faceUp={true}
              deckLength={deckLength}
              onClick={this.handleBoardSelect}
              cards={boardCards}
              selected={this.state.boardSelected}
            ></BoardCards>
            <PlayerMoves
              active={this.getActiveButtons()}
              onTrade={this.handleTrade}
              onTakeMany={this.handleTakeMany}
              onTakeOne={this.handleTakeOne}
              onTakeCamels={this.handleTakeCamels}
              clearHandler={this.clearSelection}
            ></PlayerMoves>
          </div>
          <div className="hsplit bottom">
            <PlayerCards
              cards={myCards}
              selected={this.state.handSelected}
              faceUp={true}
              onClick={this.handleHandSelect}
              opponent={false}
            ></PlayerCards>
            <TurnIndicator
              currentPlayer={currentPlayer}
              playerID={playerID}
            ></TurnIndicator>
          </div>
        </div>
      </div>
    );
  }
}

export default UdaipurBoard;
