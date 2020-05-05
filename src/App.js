// src/App.js
import { Udaipur } from "./game.js";
import { Client } from "boardgame.io/react";
import UdaipurBoard from "./components/board.jsx";
import { SocketIO } from "boardgame.io/multiplayer";

const App = Client({
  game: Udaipur,
  board: UdaipurBoard,
  multiplayer: SocketIO({ server: "localhost:8001" }),
  playerID: 0,
});

export default App;
