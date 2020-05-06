const { Server } = require("boardgame.io/server");
const { UdaipurGame: Udaipur } = require("./game");
import { LOBBY_SERVER_PORT } from "./config";
const server = Server({
  games: [Udaipur],
});

server.run(LOBBY_SERVER_PORT);
