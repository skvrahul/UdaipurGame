import React, { Component } from "react";
import "./styles/tokenstack.css";
class TokenStack extends Component {
  state = {};
  getCoins = (coinValues) =>
    coinValues.map((val, ind) => {
      return (
        <div id={ind} className={ind === 0 ? "coin first" : "coin"}>
          <h4>{val}</h4>
        </div>
      );
    });

  getColourClass = () => {
    const resType = this.props.resource.toLowerCase();
    // Perform more complicated inference from resource type here if needed.
    // TODO: Check if camel here and do something accordingly
    return resType;
  };
  render() {
    return (
      <div className={"coin-container " + this.getColourClass()}>
        {this.getCoins(this.props.coinValues)}
        <div style={{ clear: "both" }}></div>
      </div>
    );
  }
}

export default TokenStack;
