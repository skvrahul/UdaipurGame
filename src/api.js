import { GAME_NAME, GAME_SERVER_URL, APP_PRODUCTION } from "./config";
import ky from "ky";
const server = APP_PRODUCTION
  ? `https://${window.location.hostname}`
  : GAME_SERVER_URL;

export class LobbyAPI {
  constructor() {
    this.api = ky.create({
      prefixUrl: `${server}/games/${GAME_NAME}`,
    });
  }
  async createRoom(numPlayers) {
    const data = await this.api
      .post("create", { numPlayers: numPlayers })
      .json();
    return data.gameID;
  }

  async joinRoom(roomID, username, userid) {
    const payload = { playerID: userid, playerName: username };
    const data = await this.api
      .post(roomID + "/join", { json: payload })
      .json();
    const { playerCredentials } = data;
    return playerCredentials;
  }
  async leaveRoom(roomID, userid, playerCredentials) {
    const payload = { playerID: userid, credentials: playerCredentials };
    try {
      await this.api.post(roomID + "/leave", { json: payload }).json();
    } catch (error) {
      console.log("error in leaveRoom: ", error);
    }
  }
  async whosInRoom(roomID) {
    const data = await this.api.get(roomID).json();
    return data.players;
  }
}
