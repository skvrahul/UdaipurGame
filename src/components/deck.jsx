import React, { Component } from "react";
import Card from "./card";
class Deck extends Component {
  render() {
    return (
      <div>
        <Card></Card>
        {this.props.cards.map((card) => (
          <Card card={card} type="BOARD" faceUp={true}></Card>
        ))}
      </div>
    );
  }
}

export default Deck;
