// src/App.js
import React from "react";
import { Switch, Route, useHistory } from "react-router";
import Lobby from "./components/lobby.jsx";
import { Client } from "boardgame.io/react";
import { APP_PRODUCTION, GAME_SERVER_URL } from "./config.js";
import { UdaipurGame } from "./game/game.js";
import UdaipurBoard from "./components/board.jsx";
import { SocketIO } from "boardgame.io/multiplayer";
import HomePage from "./components/homePage.jsx";
import HelpPage from "./components/helpPage.jsx";
import JoinPage from "./components/joinPage.jsx";

function App() {
  const history = useHistory();
  const server = APP_PRODUCTION
    ? `https://${window.location.hostname}`
    : GAME_SERVER_URL;
  const UdaipurClient = Client({
    game: UdaipurGame,
    board: UdaipurBoard,
    multiplayer: SocketIO({ server: server }),
  });
  const renderUdaipurClient = () => {
    return <UdaipurClient playerID="0"></UdaipurClient>;
  };
  return (
    <Switch>
      <Route
        path="/home"
        exact
        render={(props) => <HomePage {...props} history={history} />}
      />
      <Route
        path="/help"
        exact
        render={(props) => <HelpPage {...props} history={history} />}
      />
      <Route
        path="/join"
        exact
        render={(props) => <JoinPage {...props} history={history} />}
      />
      <Route path="/play" exact render={(props) => renderUdaipurClient()} />
      <Route path="/lobby/:id" component={Lobby} />
      <Route
        path="*"
        render={(props) => <HomePage {...props} history={history} />}
      />
    </Switch>
  );
}

export default App;
