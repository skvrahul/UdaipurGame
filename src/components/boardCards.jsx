import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "./card";

class BoardCards extends Component {
  state = {};
  render() {
    return (
      <TransitionGroup className="card-container">
        <Card type="DECK" faceUp={false} length={this.props.deckLength}></Card>
        {this.props.cards.map((card) => (
          <CSSTransition key={card.id} timeout={500} classNames="card">
            <Card
              key={card.id}
              card={card}
              type="BOARD"
              enabled={true}
              faceUp={this.props.faceUp}
              selected={this.props.selected.includes(card.id)}
              onClick={this.props.onClick}
            ></Card>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

export default BoardCards;
