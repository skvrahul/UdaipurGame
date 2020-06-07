import React, { Component } from "react";
import "./styles/sidebar.css";
class Sidebar extends Component {
  state = {
    open: false,
  };
  toggleState = () => {
    const open = this.state.open;
    this.setState({ open: !open });
  };
  render() {
    const sidebarContent = (
      <>
        <div class="chatbox">
          <div class="chat-item not-me">
            Hi there! Welcome to Udaipur! You will find a log of all player
            moves below...
          </div>
          {this.props.chat.map((chatItem) => {
            const isMe = String(chatItem.player) === String(this.props.me);
            if (isMe) {
              return (
                <div class="chat-item me">
                  <b>You</b>
                  <br />
                  {chatItem.action}
                </div>
              );
            } else {
              return (
                <div class="chat-item not-me">
                  <b>Opponent</b>
                  <br />
                  {chatItem.action}
                </div>
              );
            }
          })}
        </div>
      </>
    );
    return (
      <div class={"sidebar " + (this.state.open ? "open" : "closed")}>
        <div class={"sidebar-tab"} onClick={this.toggleState}>
          <div class="icon-container">
            <h3>History</h3>
          </div>
        </div>
        <div class="sidebar-content">
          {this.state.open ? sidebarContent : null}
        </div>
      </div>
    );
  }
}

export default Sidebar;
