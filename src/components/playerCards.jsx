import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { RESOURCES } from "../constants";
import Card from "./card";

class PlayerCards extends Component {
  state = {};
  render() {
    return (
      <TransitionGroup className="card-container">
        <div className="camels">
          {this.props.cards
            .filter((card) => card.type === RESOURCES.camel)
            .map((card) => (
              <CSSTransition key={card.id} timeout={500} classNames="card">
                <Card
                  key={card.id}
                  card={card}
                  selected={this.props.selected.includes(card.id)}
                  faceUp={true}
                  type="HAND"
                  onClick={this.props.onClick}
                ></Card>
              </CSSTransition>
            ))}
        </div>

        {this.props.cards
          .filter((card) => card.type !== RESOURCES.camel)
          .map((card) => (
            <CSSTransition key={card.id} timeout={500} classNames="card">
              <Card
                key={card.id}
                card={card}
                selected={this.props.selected.includes(card.id)}
                faceUp={this.props.faceUp}
                type="HAND"
                onClick={this.props.onClick}
              ></Card>
            </CSSTransition>
          ))}
      </TransitionGroup>
    );
  }
}

export default PlayerCards;
