import React, { Component } from "react";
import "./styles/turnIndicator.css";
class TurnIndicator extends Component {
  render() {
    const playerID = this.props.playerID;
    const currentPlayer = this.props.currentPlayer;
    const iAmActive = currentPlayer === playerID;
    return (
      <div
        className={"turn-indicator " + (iAmActive ? "active" : null)}
        style={{ fontSize: "20px" }}
      >
        {iAmActive ? "Your turn" : "Opponents turn"}
      </div>
    );
  }
}

export default TurnIndicator;
