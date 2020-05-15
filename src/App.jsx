// src/App.js
import React from "react";
import { Switch, Route, useHistory } from "react-router";
import HomePage from "./components/homepage.jsx";
import Lobby from "./components/lobby.jsx";

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
