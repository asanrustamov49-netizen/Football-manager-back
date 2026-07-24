import { bodyParser } from "../middlewares/bodyParser.js";
import {
  deleteTeamService,
  getOneTeamService,
  getTeamsService,
  postTeamService,
  updateTeamService,
} from "../services/team.service.js";
import { teamSchema } from "../validation/teams.validation.js";

export const postTeamController = async (req, res) => {
  try {
    const body = await bodyParser(req);
    const validation = teamSchema.safeParse(body);

    if (!validation.success) {
      res.statusCode = 400;
      return res.end(
        JSON.stringify({
          message: "Validation failed",
          errors: validation.error.issues,
        }),
      );
    }

    const result = await postTeamService(validation.data);

    res.statusCode = 201;
    res.end(
      JSON.stringify({
        message: "Team created successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        message: error.message,
      }),
    );
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
    const validation = teamSchema.safeParse(body);

    if (!validation.success) {
      res.statusCode = 400;
      return res.end(
        JSON.stringify({
          message: "Validation failed",
          errors: validation.error.issues,
        }),
      );
    }

    const result = await updateTeamService(id, validation.data);

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Team updated successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        message: error.message,
      }),
    );
  }
};
