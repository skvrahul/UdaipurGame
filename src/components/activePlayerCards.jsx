import React, { Component } from "react";
import Card from "./card";
class PlayerCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.cards.map((card) => <Card card={card}></Card>);
  }
}

export default PlayerCards;
