// src/App.js
import React from "react";
import { Switch, Route, useHistory } from "react-router";
import HomePage from "./components/homepage.jsx";
import Lobby from "./components/lobby.jsx";
import { Client } from "boardgame.io/react";
import { APP_PRODUCTION } from "./config.js";
import { UdaipurGame } from "./game/game.js";
import UdaipurBoard from "./components/board.jsx";

function App() {
  const history = useHistory();
  const GameClient = Client({
    game: UdaipurGame,
    board: UdaipurBoard,
    multiplayer: false,
    debug: !APP_PRODUCTION,
  });
  return (
    <Switch>
      <Route
        path="/home"
        exact
        render={(props) => <HomePage {...props} history={history} />}
      />
      <Route
        path="/play"
        exact
        render={(props) => <GameClient playerID="0" />}
      />
      <Route path="/lobby/:id" component={Lobby} />
      <Route
        path="*"
        render={(props) => <HomePage {...props} history={history} />}
      />
    </Switch>
  );
}

export default App;
