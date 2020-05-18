import React, { Component } from "react";
import "./styles/cards.css";
class Card extends Component {
  selectedHandler = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.card.id);
    } else {
      console.log("No handler passed for onSelect");
    }
  };
  getColorClass = () => {
    if (this.props.faceUp && this.props.card) {
      return this.props.card.type.toLowerCase();
    } else {
      return "back";
    }
  };
  getCardClass = () => {
    let cl = "card";
    if (this.props.selected) {
      cl += " selected";
    }
    if (this.props.type === "DECK") {
      cl += " deck";
    }
    if (!this.props.enabled) {
      cl += " disabled";
    }
    return cl;
  };
  render() {
    return (
      <div onClick={this.selectedHandler} className={this.getCardClass()}>
        <div className={"card-inside " + this.getColorClass()}>
          {this.props.type === "DECK" ? (
            <h3 color="white">{this.props.length}</h3>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Card;
