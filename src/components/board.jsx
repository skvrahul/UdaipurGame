import React, { Component } from "react";
import PlayerMoves from "./playerMoves";
import Card from "./card";
import Popup from "react-popup";
import TokenStack from "./tokenStack";
import { RESOURCES, RARE_RESOURCES } from "../constants";
import "./styles/cards.css";
import "./styles/boardLayout.css";

class UdaipurBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSelected: [],
      handSelected: [],
    };
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
  handleTrade = () => {
    console.log("Handling trade!");
    console.log(this.state.handSelected);
    this.props.moves.trade(this.state.handSelected);
    this.clearSelection();
  };
  handleTakeOne = () => {
    console.log("Handling take one!");
    console.log(this.state.boardSelected);
    if (this.state.boardSelected.length !== 1) {
      Popup.alert("Please select only 1 card to take from the Board!");
      return;
    }
    this.props.moves.takeOne(this.state.boardSelected[0]);
    this.clearSelection();
  };
  handleTakeCamels = () => {
    console.log("Handling take camels!");
    this.props.moves.takeCamels();
    this.clearSelection();
  };
  handleTakeMany = () => {
    console.log("Handling take many!");
    console.log(this.state.handSelected);
    console.log(this.state.boardSelected);
    this.props.moves.takeMany(
      this.state.boardSelected,
      this.state.handSelected
    );
    this.clearSelection();
  };
  PlayerCards = ({ cards }) => (
    <div className="card-container">
      <div className="camels">
        {cards
          .filter((card) => card.type === RESOURCES.camel)
          .map((card) => (
            <Card
              key={card.id}
              card={card}
              selected={this.state.handSelected.includes(card.id)}
              faceUp={true}
              type="HAND"
              onClick={this.handleHandSelect}
            ></Card>
          ))}
      </div>

      {cards
        .filter((card) => card.type !== RESOURCES.camel)
        .map((card) => (
          <Card
            key={card.id}
            card={card}
            selected={this.state.handSelected.includes(card.id)}
            faceUp={true}
            type="HAND"
            onClick={this.handleHandSelect}
          ></Card>
        ))}
    </div>
  );
  BoardCards = ({ cards, deckLength }) => (
    <div className="card-container">
      <Card type="DECK" faceUp={false} length={deckLength}></Card>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          type="BOARD"
          faceUp={true}
          selected={this.state.boardSelected.includes(card.id)}
          onClick={this.handleBoardSelect}
        ></Card>
      ))}
    </div>
  );
  getActiveButtons = () => {
    const G = this.props.G;
    const p = this.props.ctx.currentPlayer;
    let active = {
      takeCamels: true,
      takeOne: true,
      takeMany: true,
      trade: true,
    };
    const board = G.board;

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
    const playerRareResources = G.players[p].cards.filter((card) =>
      RARE_RESOURCES.includes(card.type)
    );
    // TODO: If player has only rare resources, then check if he has atleast 2 rare to trade
    return active;
  };
  render() {
    const ap = this.props.playerID;
    console.log("AP", ap);
    const p = this.props.ctx.currentPlayer;
    document.background = "#";
    const boardCards = this.props.G.board;
    const myCards = this.props.G.players[p].cards;
    const deckLength = this.props.G.deck.length;
    const resourceTokens = this.props.G.tokens;
    console.log(resourceTokens);
    return (
      <div className="container full_height">
        <div className="vsplit left">
          {Object.keys(resourceTokens).map((key) => (
            <TokenStack
              id={key}
              resource={key}
              coinValues={resourceTokens[key]}
            ></TokenStack>
          ))}
        </div>
        <div className="vsplit right">
          <div className="hsplit top">
            <this.BoardCards
              deckLength={deckLength}
              cards={boardCards}
            ></this.BoardCards>
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
            <this.PlayerCards cards={myCards}></this.PlayerCards>
            <button onClick={this.clearSelection}>Clear Selection</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UdaipurBoard;
