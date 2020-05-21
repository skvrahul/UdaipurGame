import React, { Component } from "react";
import "./styles/specialTokens.css";
class SpecialTokens extends Component {
  render() {
    const tradeToken = this.props.tradeToken;
    return (
      <div>
        <div
          className={"token three " + (tradeToken === 3 ? "pulse" : null)}
        ></div>
        <div
          className={"token four " + (tradeToken === 4 ? "pulse" : null)}
        ></div>
        <div
          className={"token five " + (tradeToken === 5 ? "pulse" : null)}
        ></div>
        <div
          className={"token herd " + (tradeToken === 19 ? "pulse" : null)}
        ></div>
      </div>
    );
  }
}
export default SpecialTokens;
