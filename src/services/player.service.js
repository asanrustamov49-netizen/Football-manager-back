import { pool } from "../plugins/pg.js";

export const postPlayerService = async (body) => {
  const result = await pool.query(
    `
        insert into 
        players (name, age, image, salary, team_id)
        values ($1, $2, $3, $4, $5)
        returning *
    `,
    [body.name, body.age, body.image, body.salary, body.team_id],
  );

  return result.rows[0];
};
export const getPlayersService = async () => {
  const result = await pool.query(`select * from players`);

  return result.rows;
};
export const getOnePlayerService = async (id) => {
  const result = await pool.query(
    `
        select * from players
        where id = $1
        `,
    [id],
  );

  if (!result.rows[0]) {
    throw new Error("Not Found id");
  }

  return result.rows[0];
};
export const deletePlayerService = async (id) => {
  const result = await pool.query(
    `
        delete from players 
        where id = $1
        returning *
        `,
    [id],
  );

  if (!result.rows[0]) {
    throw new Error("Not Found id");
  }

  return result.rows[0];
};
export const updatePlayerService = async (id, newBody) => {
  const result = await pool.query(
    `
        update players
        set name = $1, age = $2, image = $3, salary = $4, team_id = $5
        where id = $6
        returning *
        `,
    [newBody.name, newBody.age, newBody.image, newBody.salary, newBody.team_id, id],
  );

  if (!result.rows[0]) {
    throw new Error("Not Found id");
  }

  return result.rows[0];
};
