// src/App.js
import { UdaipurGame } from "./game.js";
import { Client } from "boardgame.io/react";
import UdaipurBoard from "./components/board.jsx";
import { SocketIO } from "boardgame.io/multiplayer";
import React from "react";
import { Switch, Route } from "react-router";
import HomePage from "./components/homepage.jsx";
import { SERVER_URL, GAME_SERVER_PORT } from "./config.js";

const UdaipurClient = Client({
  game: UdaipurGame,
  board: UdaipurBoard,
  multiplayer: SocketIO({ server: SERVER_URL + ":" + GAME_SERVER_PORT }),
});
const renderUdaipurClient = () => {
  return <UdaipurClient playerID="0"></UdaipurClient>;
};
function App() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/play" component={renderUdaipurClient} />
    </Switch>
  );
}

export default App;
