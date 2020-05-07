import React, { Component } from "react";
import { LobbyAPI } from "./api";
const api = new LobbyAPI();
class Lobby extends Component {
  state = {};
  constructor(props) {
    super(props);
    console.log("construct");
    this.state.id = props.match.params.id;
    this.state.checked = false;
  }
  render() {
    console.log("state.id ", this.state.id);
    if (this.state.id && !this.state.checked) {
      api.roomExists(this.state.id).then(
        (roomData) => {
          console.log("here");
          this.setState({
            checked: true,
          });
        },
        (error) => {
          console.log("error ", error);
          console.log("room does not exist");
          this.setState({
            id: null,
            checked: true,
          });
        }
      );
    }
    if (this.state.id) {
      return <div>This game's id is {this.state.id}</div>;
    } else {
      return <div>Sorry game not found</div>;
    }
  }
}

export default Lobby;
