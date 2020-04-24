import React, { Component } from "react";
import "./styles/card.css";
import Logos from "../logos.js";
import { RESOURCES } from "../constants";
class Card extends Component {
  selectedHandler = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.card.id);
    } else {
      console.log("No handler passed for onSelect");
    }
  };
  render() {
    let shadowColor = "#aaaaaa";
    const cardData = this.props.card;
    let imgSrc = "";
    if (this.props.selected && this.props.type === "HAND") {
      shadowColor = "#eb6157";
    } else if (this.props.selected && this.props.type === "BOARD") {
      shadowColor = "#68ed85";
    }

    if (this.props.faceUp) {
      switch (cardData.type) {
        case RESOURCES.diamond:
          imgSrc = Logos.diamond;
          break;
        case RESOURCES.gold:
          imgSrc = Logos.gold;
          break;
        case RESOURCES.silver:
          imgSrc = Logos.silver;
          break;
        case RESOURCES.leather:
          imgSrc = Logos.leather;
          break;
        case RESOURCES.spices:
          imgSrc = Logos.spices;
          break;
        case RESOURCES.silk:
          imgSrc = Logos.silk;
          break;
        case RESOURCES.camel:
          imgSrc = Logos.camel;
          break;
        default:
          imgSrc = "";
      }
      return (
        <div
          className="card front"
          style={{ boxShadow: "0px 0px 3px 6px " + shadowColor }}
          onClick={() => this.selectedHandler()}
        >
          <span className="inner">
            <img className="res_img" src={imgSrc} alt="resource_logo" />
          </span>
        </div>
      );
    } else {
      imgSrc = Logos.emblem;
      return (
        <div
          className="card back"
          style={{ boxShadow: "0px 0px 3px 6px " + shadowColor }}
          onClick={() => this.selectedHandler()}
        >
          <span className="inner">
            <img className="" src={imgSrc} alt="card_back" />
          </span>
        </div>
      );
    }
  }
}

export default Card;
