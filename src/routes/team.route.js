import {
  deleteTeamController,
  getOneTeamController,
  getTeamsController,
  postTeamController,
  updateTeamController,
} from "../controllers/team.controller.js";

export const teamRouter = (req, res) => {
  if (req.method === "POST" && req.url === "/teams") {
    return postTeamController(req, res);
  } else if (req.method === "GET" && req.url === "/teams") {
    return getTeamsController(req, res);
  } else if (req.method === "GET" && req.url.startsWith("/teams/")) {
    return getOneTeamController(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/teams/")) {
    return deleteTeamController(req, res);
  } else if (req.method === "PATCH" && req.url.startsWith("/teams/")) {
    return updateTeamController(req, res);
  }
};
