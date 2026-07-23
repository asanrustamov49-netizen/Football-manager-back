import { bodyParser } from "../middlewares/bodyParser.js";
import {
  deleteTeamService,
  getOneTeamService,
  getTeamsService,
  postTeamService,
  updateTeamService,
} from "../services/team.service.js";

export const postTeamController = async (req, res) => {
  try {
    const body = await bodyParser(req);
    const result = await postTeamService(body);

    res.statusCode = 201;
    res.end(
      JSON.stringify({
        message: "Team created successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
export const getTeamsController = async (req, res) => {
  try {
    const result = await getTeamsService();

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Teams received successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
export const getOneTeamController = async (req, res) => {
  try {
    const id = req.url.split("/")[2];
    const result = await getOneTeamService(id);

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Team received by id successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
export const deleteTeamController = async (req, res) => {
  try {
    const id = req.url.split("/")[2];
    const result = await deleteTeamService(id);

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Team deleted successfully",
        deleted: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
export const updateTeamController = async (req, res) => {
  try {
    const id = req.url.split("/")[2];
    const body = await bodyParser(req);
    const result = await updateTeamService(id, body);

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Team updated successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
