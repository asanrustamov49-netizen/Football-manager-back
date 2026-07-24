import { bodyParser } from "../middlewares/bodyParser.js";
import {
  deletePlayerService,
  getOnePlayerService,
  getPlayersService,
  getPlayersWithTeamService,
  postPlayerService,
  updatePlayerService,
} from "../services/player.service.js";

export const postPlayerController = async (req, res) => {
  try {
    const body = await bodyParser(req);
    const result = await postPlayerService(body);

    res.statusCode = 201;
    res.end(
      JSON.stringify({
        message: "Player created successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
export const getPlayersController = async (req, res) => {
  try {
    const result = await getPlayersService();

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Players received successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
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
    const result = await updatePlayerService(id, body);

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Player updated successfully",
        data: result,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
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

