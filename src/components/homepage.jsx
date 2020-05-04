import React, { Component } from "react";
import "./styles/homePage.css";
const info_texts = {
  start: "START info text",
  help: "HELP info text",
  join: "JOIN info text",
};
class HomePage extends Component {
  state = {
    text: "",
  };
  hoverIn = (src) => {
    let infoText = "";
    if (Object.keys(info_texts).includes(src)) {
      infoText = info_texts[src];
    } else {
      console.log("Unrecognized key for info_text");
    }
    this.setState({
      text: infoText,
    });
  };
  hoverOut = () => {
    this.setState({
      text: "",
    });
  };
  render() {
    return (
      <div class="full_height">
        <div class="title">
          <h1>Udaipur</h1>
        </div>
        <div class="menu-cards">
          <div
            class="card"
            onMouseEnter={() => this.hoverIn("start")}
            onMouseLeave={() => this.hoverOut()}
          >
            <div class="card-inside start">
              <h1>new game</h1>
            </div>
          </div>
          <div
            class="card"
            onMouseEnter={() => this.hoverIn("join")}
            onMouseLeave={() => this.hoverOut()}
          >
            <div class="card-inside join">
              <h1>join game</h1>
            </div>
          </div>
          <div
            class="card"
            onMouseEnter={() => this.hoverIn("help")}
            onMouseLeave={() => this.hoverOut()}
          >
            <div class="card-inside help">
              <h1>game help</h1>
            </div>
          </div>
        </div>
        <div id="menu-description">{this.state.text}</div>
      </div>
    );
  }
}

export default HomePage;
