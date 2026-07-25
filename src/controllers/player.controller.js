import { bodyParser } from "../middlewares/bodyParser.js";
import {
  deletePlayerService,
  getOnePlayerService,
  getPlayersService,
  getPlayersWithTeamService,
  getStatisticsService,
  postPlayerService,
  updatePlayerService,
} from "../services/player.service.js";
import { playerSchema } from "../validation/players.validation.js";

export const postPlayerController = async (req, res) => {
  try {
    const body = await bodyParser(req);
    const validation = playerSchema.safeParse(body);

    if (!validation.success) {
      res.statusCode = 400;
      return res.end(
        JSON.stringify({
          message: "Validation failed",
          errors: validation.error.issues,
        }),
      );
    }
    const result = await postPlayerService(validation.data);

    res.statusCode = 201;
    res.end(
      JSON.stringify({
        message: "Player created successfully",
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
export const getOnePlayerController = async (req, res) => {
  try {
    const id = req.url.split("/")[2];
    const result = await getOnePlayerService(id);

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Player received by id successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
export const deletePlayerController = async (req, res) => {
  try {
    const id = req.url.split("/")[2];
    const result = await deletePlayerService(id);

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Player deleted successfully",
        deleted: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
export const updatePlayerController = async (req, res) => {
  try {
    const id = req.url.split("/")[2];
    const body = await bodyParser(req);
    const validation = playerSchema.safeParse(body);

    if (!validation.success) {
      res.statusCode = 400;
      return res.end(
        JSON.stringify({
          message: "Validation failed",
          errors: validation.error.issues,
        }),
      );
    }

    const result = await updatePlayerService(id, validation.data);

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Player updated successfully",
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
export const getPlayersWithTeamController = async (req, res) => {
  try {
    const result = await getPlayersWithTeamService();

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Players with teams received",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
export const getStatisticsController = async (req, res) => {
  try {
    const result = await getStatisticsService();

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Statistics received",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
