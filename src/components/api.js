import { SERVER_URL, LOBBY_SERVER_PORT, GAME_NAME } from "../config";
import ky from "ky";

export class LobbyAPI {
  constructor() {
    const { origin, protocol, hostname } = window.location;
    console.log(origin, protocol, hostname);
    this.api = ky.create({
      prefixUrl: `${protocol}//${hostname}:${LOBBY_SERVER_PORT}/games/${GAME_NAME}`,
    });
  }
  async createRoom(numPlayers) {
    const data = await this.api
      .post("create", { numPlayers: numPlayers })
      .json();
    return data.gameID;
  }

  async joinRoom(roomID, username, userid) {
    const data = await this.api
      .post(roomID + "/join", { playerID: userid, playerName: username })
      .json();
    const { playerCredentials } = data;
    return playerCredentials;
  }

  async whosInRoom(roomID) {
    const data = await this.api.get(roomID).json();
    return data.players;
  }

  async roomExists(roomID) {
    const data = await this.api.get(roomID).json();
    return data;
  }
}
