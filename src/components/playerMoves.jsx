import React, { Component } from "react";
import "./styles/button.css";
class PlayerMoves extends Component {
  render() {
    return (
      <div>
        <button
          className="deep-button"
          disabled={!this.props.active.takeCamels}
          onClick={this.props.onTakeCamels}
        >
          Take Camels
        </button>
        <button
          className="deep-button"
          disabled={!this.props.active.takeOne}
          onClick={this.props.onTakeOne}
        >
          Take One
        </button>
        <button
          className="deep-button"
          disabled={!this.props.active.takeMany}
          onClick={this.props.onTakeMany}
        >
          Take Many
        </button>
        <button
          className="deep-button trade"
          disabled={!this.props.active.trade}
          onClick={this.props.onTrade}
        >
          Trade
        </button>
      </div>
    );
  }
}
export default PlayerMoves;
