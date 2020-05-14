const { Server } = require("boardgame.io/server");
const { UdaipurGame: Udaipur } = require("./game/game");
import { GAME_SERVER_PORT } from "./config";
const server = Server({
  games: [Udaipur],
});

server.run(GAME_SERVER_PORT);
