import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import "./styles/specialTokens.css";
class SpecialTokens extends Component {
  render() {
    const tradeToken = this.props.tradeToken;
    return (
      <div>
        <div
          className={"token three " + (tradeToken === 3 ? "pulse" : null)}
          data-tip={"3 Card Bonus"}
        ></div>
        <div
          className={"token four " + (tradeToken === 4 ? "pulse" : null)}
          data-tip={"4 Card Bonus"}
        ></div>
        <div
          className={"token five " + (tradeToken === 5 ? "pulse" : null)}
          data-tip={"5 Card Bonus"}
        ></div>
        <div
          className={"token herd " + (tradeToken === 19 ? "pulse" : null)}
        ></div>
        <ReactTooltip />
      </div>
    );
  }
}
export default SpecialTokens;
