// src/App.js
import { UdaipurGame } from "./game.js";
import { Client } from "boardgame.io/react";
import UdaipurBoard from "./components/board.jsx";
import { SocketIO } from "boardgame.io/multiplayer";
import React from "react";
import { Switch, Route, useHistory } from "react-router";
import HomePage from "./components/homepage.jsx";
import { SERVER_URL, GAME_SERVER_PORT } from "./config.js";
import Lobby from "./components/lobby.jsx";

const UdaipurClient = Client({
  game: UdaipurGame,
  board: UdaipurBoard,
  multiplayer: SocketIO({ server: SERVER_URL + ":" + GAME_SERVER_PORT }),
});
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
      <Route path="/play" component={renderUdaipurClient} />
      <Route
        path="*"
        render={(props) => <HomePage {...props} history={history} />}
      />
    </Switch>
  );
}

export default App;
