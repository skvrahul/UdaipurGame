import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import "./styles/cards.scss";
import { RESOURCES } from "../constants";
class Card extends Component {
  selectedHandler = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.card.id);
    } else {
      console.log("No handler passed for onSelect");
    }
  };
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    s = s.toLowerCase();
    return s.toLowerCase().charAt(0).toUpperCase() + s.slice(1);
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
    let tooltip_text = null;
    const card = this.props.card;
    if (
      card &&
      Object.values(RESOURCES).includes(card.type) &&
      this.props.faceUp
    ) {
      tooltip_text = this.capitalize(card.type);
    }
    return (
      <div
        data-tip={tooltip_text}
        onClick={this.selectedHandler}
        className={this.getCardClass()}
      >
        <div className={"card-inside " + this.getColorClass()}>
          {this.props.type === "DECK" ? (
            <h3 color="white">{this.props.length}</h3>
          ) : null}
        </div>
        <ReactTooltip />
      </div>
    );
  }
}

export default Card;
