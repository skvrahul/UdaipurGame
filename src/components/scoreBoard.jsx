import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import "./styles/scoreBoard.css";
class ScoreBoard extends Component {
  state = {};
  render() {
    const tradeTokens = this.props.tradeTokens;
    const score = tradeTokens.reduce((result, token) => {
      return result + token.value;
    }, 0);
    console.log(tradeTokens);
    console.log(score);
    const span_3 = (
      <span className="mini-token three" data-tip={"3 Card Bonus"}></span>
    );
    const span_4 = (
      <span className="mini-token four" data-tip={"4 Card Bonus"}></span>
    );
    const span_5 = (
      <span className="mini-token five" data-tip={"5 Card Bonus"}></span>
    );
    return (
      <>
        <div className="game-scoreboard">
          Score: <h3>{score}</h3>
          <br></br>
          <span className="tab"></span>
          {this.props.T3} <span className="cross-small">☓</span> {span_3}
          <span className="tab"></span>
          {this.props.T4} <span className="cross-small">☓</span> {span_4}
          <span className="tab"></span>
          {this.props.T5} <span className="cross-small">☓</span> {span_5}
          <ReactTooltip />
        </div>
      </>
    );
  }
}

export default ScoreBoard;
