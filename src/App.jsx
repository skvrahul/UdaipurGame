// src/App.js
import { UdaipurGame } from "./game/game.js";
import { Client } from "boardgame.io/react";
import UdaipurBoard from "./components/board.jsx";
import { SocketIO } from "boardgame.io/multiplayer";
import React from "react";
import { Switch, Route, useHistory } from "react-router";
import HomePage from "./components/homepage.jsx";
import { GAME_SERVER_URL } from "./config.js";
import Lobby from "./components/lobby.jsx";

const renderUdaipurClient = () => {
  return <UdaipurClient playerID="0"></UdaipurClient>;
};
function App() {
  const history = useHistory();
  return (
    <Switch>
      <Route
        path="/home"
        exact
        render={(props) => <HomePage {...props} history={history} />}
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
