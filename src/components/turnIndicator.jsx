import React, { Component } from "react";
import "./styles/turnIndicator.css";
const audio = new Audio(
  "https://freesound.org/data/previews/320/320654_5260872-lq.mp3"
);
class TurnIndicator extends Component {
  state = {
    played: false,
  };
  render() {
    const playerID = this.props.playerID;
    const currentPlayer = this.props.currentPlayer;
    const iAmActive = currentPlayer === playerID;
    if (iAmActive && !this.state.played) {
      audio.play();
      this.setState({ played: true });
    }
    if (!iAmActive && this.state.played) {
      this.setState({ played: false });
    }
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
