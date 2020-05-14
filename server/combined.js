import path from "path";
import serve from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import { Server } from "boardgame.io/server";
import { GAME_SERVER_PORT } from "../src/config";
import { UdaipurGame } from "../src/game";

const root = path.join(__dirname, "../build");
const PORT = process.env.PORT || GAME_SERVER_PORT;

const server = Server({ games: [UdaipurGame] });

server.app.use(
  historyApiFallback({
    index: "index.html",
    whiteList: ["/home", "/lobby", "/games", "/.well-known"],
  })
);
server.app.use(serve(root));

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
