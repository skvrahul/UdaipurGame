import React, { Component } from "react";
import Card from "./card";
class Deck extends Component {
  render() {
    return (
      <div>
        <div className="card-container">
          <Card type="DECK" faceUp={false} length={this.props.length}></Card>
          {this.props.cards.map((card) => (
            <Card card={card} type="BOARD" faceUp={true}></Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Deck;
