import {
  deletePlayerController,
  getOnePlayerController,
  getPlayersWithTeamController,
  postPlayerController,
  updatePlayerController,
} from "../controllers/player.controller.js";

export const playerRouter = (req, res) => {
  if (req.method === "POST" && req.url === "/players") {
    return postPlayerController(req, res);
  } else if (req.method === "GET" && req.url === "/players/with-teams") {
    return getPlayersWithTeamController(req, res);
  } else if (req.method === "GET" && req.url.startsWith("/players/")) {
    return getOnePlayerController(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/players/")) {
    return deletePlayerController(req, res);
  } else if (req.method === "PATCH" && req.url.startsWith("/players/")) {
    return updatePlayerController(req, res);
  }
};
