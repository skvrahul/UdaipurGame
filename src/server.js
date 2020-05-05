const { Server } = require("boardgame.io/server");
const { Udaipur } = require("./game");

const server = Server({
  games: [Udaipur],
});

server.run(8001);
