const { Server } = require("boardgame.io/server");
const { UdaipurGame: Udaipur } = require("./game");

const server = Server({
  games: [Udaipur],
});

server.run(8001);
