import React, { Component } from "react";
import TemplatePage from "./templatePage";
import TokenStack from "./tokenStack";
import { RESOURCES } from "../constants";
import "./styles/helpPage.css";
import PlayerCards from "./playerCards";
import SpecialTokens from "./specialTokens";
class HelpPage extends Component {
  render() {
    const cards = [
      {
        id: 14,
        type: "SILVER",
      },
      {
        id: 16,
        type: "SILVER",
      },
      {
        id: 9,
        type: "GOLD",
      },
      {
        id: 27,
        type: "CAMEL",
      },
      {
        id: 37,
        type: "LEATHER",
      },
    ];
    const rare_cards = [
      {
        id: 16,
        type: RESOURCES.silver,
      },
      {
        id: 9,
        type: RESOURCES.gold,
      },
      {
        id: 7,
        type: RESOURCES.diamond,
      },
    ];
    const common_cards = [
      {
        id: 16,
        type: RESOURCES.silk,
      },
      {
        id: 9,
        type: RESOURCES.leather,
      },
      {
        id: 7,
        type: RESOURCES.spices,
      },
    ];
    return (
      <TemplatePage
        content={
          <div className="help-content">
            <div>
              <h2>Introduction</h2>
              Udaipur is a minimalist clone of the popular card trading game by
              a very similar name. Most of the rules have been kept the same
              with the exception of making it a bit shorter by removing the{" "}
              <b>Seal of Excellence</b> tokens. Which means you now only play
              one round and the winner of the round is the winner of the game.
              <br />
              <br />
              <h2>Game Rules</h2>
              Watch this video for a quick overview of the Game Rules
              <br />
              <iframe
                title="jaipur_rules"
                width="420"
                height="315"
                src="https://www.youtube.com/embed/SD3g4gOf_N8"
              ></iframe>
              <h2>Game Board</h2>
              At the start of the game. There are 3 Camels face-up in the market
              and 2 more cards drawn from the deck face up. These are the cards
              in the middle of the board and are visible to both you and your
              opponent. You and your opponent are both dealt 5 Cards, which may
              contain either some resources or camels. Camels are left face up,
              visible to your opponent while your resource cards can only be
              seen by you.
              <br />
              Your hand will look like this:
              <br />
              <PlayerCards
                cards={cards}
                selected={[]}
                faceUp={true}
                opponent={false}
                onClick={null}
              ></PlayerCards>
              While your opponents hand will look similar to this:
              <PlayerCards
                cards={cards}
                selected={[]}
                faceUp={false}
                opponent={true}
                onClick={null}
              ></PlayerCards>
              Tokens for each of the resources (<b>Resource Tokens</b>
              ) are stacked on the left of your screen.
              <br />
              <br />
              <b>Resource Tokens</b> look like so:
              <br />
              <TokenStack
                resource={RESOURCES.silk}
                coinValues={[1, 1, 2, 2, 3, 3, 5]}
              ></TokenStack>
              Along with Resource Tokens you will also see other Special tokens.
              <br />
              Namely the 3, 4, and 5 Cards Sold Tokens and then the Largest Herd
              Token.
              <SpecialTokens></SpecialTokens>
              <br />
              <h2>Resource Colors</h2>
              The Colors below represent <b>Rare Resources</b> ( Silver, Gold
              and Diamond )
              <br />
              <PlayerCards
                cards={rare_cards}
                selected={[]}
                faceUp={true}
                opponent={false}
                onClick={null}
              ></PlayerCards>
              And the Colors below represent <b>Common Resources</b> ( Silk,
              Leather and Spices )
              <br />
              <PlayerCards
                cards={common_cards}
                selected={[]}
                faceUp={true}
                opponent={false}
                onClick={null}
              ></PlayerCards>
            </div>
          </div>
        }
      />
    );
  }
}

export default HelpPage;
