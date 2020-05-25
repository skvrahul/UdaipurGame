import React, { Component } from "react";
import "./styles/homePage.css";
import { LobbyAPI } from "../api";
import TemplatePage from "./templatePage";
const info_texts = {
  start: "Create a new room and invite your friend to join",
  help: "Game rules and guide to playing Udaipur",
  join: "Join a room using the room code",
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
        const history = this.props.history;
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
    const history = this.props.history;
    return (
      <TemplatePage
        content={
          <>
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
                onClick={() => {
                  history.push("/join");
                }}
              >
                <div className="card-inside join">
                  <h1>join game</h1>
                </div>
              </div>
              <div
                className="card"
                onMouseEnter={() => this.hoverIn("help")}
                onMouseLeave={() => this.hoverOut()}
                onClick={() => {
                  history.push("/help");
                }}
              >
                <div className="card-inside help">
                  <h1>game help</h1>
                </div>
              </div>
            </div>
            <div id="menu-description">{this.state.text}</div>
          </>
        }
      />
    );
  }
}

export default HomePage;
