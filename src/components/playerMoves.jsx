import React, { Component } from "react";
class PlayerMoves extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onTakeCamels}>Take all Camels</button>
        <button onClick={this.props.onTakeOne}>Take a Single Card</button>
        <button onClick={this.props.onTakeMany}>Take Multiple Cards</button>
        <button onClick={this.props.onTrade}>Trade</button>
      </div>
    );
  }
}

export default PlayerMoves;
