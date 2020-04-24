import React, { Component } from "react";
import PlayerMoves from "./playerMoves";
import Card from "./card";
import Popup from "react-popup";
import TokenStack from "./tokenStack";
import { RESOURCES } from "../constants";
import "./styles/cards.css";

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
  render() {
    const p = this.props.ctx.currentPlayer;

    const boardCards = this.props.G.board;
    const myCards = this.props.G.players[p].cards;
    const deckLength = this.props.G.deck.length;
    const PlayerCards = ({ cards }) => (
      <div className="card-container">
        {cards.map((card) => (
          <Card
            card={card}
            selected={this.state.handSelected.includes(card.id)}
            faceUp={true}
            type="HAND"
            onClick={this.handleHandSelect}
          ></Card>
        ))}
      </div>
    );
    const BoardCards = ({ cards, deckLength }) => (
      <div>
        <div className="card-container">
          <Card type="DECK" faceUp={false} length={deckLength}></Card>
          {cards.map((card) => (
            <Card
              card={card}
              type="BOARD"
              faceUp={true}
              selected={this.state.boardSelected.includes(card.id)}
              onClick={this.handleBoardSelect}
            ></Card>
          ))}
        </div>
      </div>
    );

    return (
      //   <div className="container full_height">
      //     <div className="vsplit left">

      //     </div>
      //   <div className="vsplit right">
      //     <div className="hsplit top">

      //     </div>
      //     <div className="hsplit bottom">

      //     </div>
      //   </div>
      // </div>
      <div style={{ height: "900px", backgroundColor: "green" }}>
        <BoardCards deckLength={deckLength} cards={boardCards}></BoardCards>
        <PlayerMoves
          onTrade={this.handleTrade}
          onTakeMany={this.handleTakeMany}
          onTakeOne={this.handleTakeOne}
          onTakeCamels={this.handleTakeCamels}
          clearHandler={this.clearSelection}
        ></PlayerMoves>
        <br></br>
        <PlayerCards cards={myCards}></PlayerCards>
        <TokenStack
          resource={RESOURCES.silk}
          coinValues={[1, 1, 4, 5, 6, 6, 6, 7]}
        ></TokenStack>
        <TokenStack
          resource={RESOURCES.silk}
          coinValues={[1, 1, 4, 5, 6, 6, 6, 7]}
        ></TokenStack>
        <span>
          <button onClick={this.clearSelection}>Clear Selection</button>
        </span>
      </div>
    );
  }
}

export default UdaipurBoard;
