import React, { Component } from "react";
import "./styles/homePage.css";
import { LobbyAPI } from "../api";
const info_texts = {
  start: "START info text",
  help: "HELP info text",
  join: "JOIN info text",
};
const api = new LobbyAPI();
class HomePage extends Component {
  state = {
    text: "",
    loading: false,
    redirect: null,
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
  createGame = () => {
    const history = this.props.history;
    console.log("createGame");
    if (this.state.loading) {
      return;
    } else {
      this.setState({
        loading: true,
      });
    }
    api.createRoom(2).then(
      (roomID) => {
        console.log("Created room with roomID = ", roomID);
        this.setState({ loading: false });
        history.push("/lobby/" + roomID);
      },
      (err) => {
        console.log(err);
        this.setState({ loading: false });
      }
    );
  };
  render() {
    return (
      <div className="full_height">
        <div className="title">
          <h1>Udaipur</h1>
        </div>
        <div className="menu-cards">
          <div
            className="card"
            onMouseEnter={() => this.hoverIn("start")}
            onMouseLeave={() => this.hoverOut()}
            onClick={() => this.createGame()}
          >
            <div className="card-inside start">
              <h1>new game</h1>
            </div>
          </div>
          <div
            className="card"
            onMouseEnter={() => this.hoverIn("join")}
            onMouseLeave={() => this.hoverOut()}
          >
            <div className="card-inside join">
              <h1>join game</h1>
            </div>
          </div>
          <div
            className="card"
            onMouseEnter={() => this.hoverIn("help")}
            onMouseLeave={() => this.hoverOut()}
          >
            <div className="card-inside help">
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
