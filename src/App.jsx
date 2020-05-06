// src/App.js
import { UdaipurGame } from "./game.js";
import { Client } from "boardgame.io/react";
import UdaipurBoard from "./components/board.jsx";
import { SocketIO } from "boardgame.io/multiplayer";
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import HomePage from "./components/homepage.jsx";

const UdaipurClient = Client({
  game: UdaipurGame,
  board: UdaipurBoard,
  multiplayer: SocketIO({ server: "localhost:8001" }),
  playerID: 0,
});
function App() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/play" component={UdaipurClient} />
    </Switch>
  );
}

export default App;
