import React, { Component } from "react";
class TurnIndicator extends Component {
  render() {
    const playerID = this.props.playerID;
    const currentPlayer = this.props.currentPlayer;
    const iAmActive = currentPlayer === playerID;
    return <div>{iAmActive ? "Your turn" : "Opponents turn"}</div>;
  }
}

export default TurnIndicator;
