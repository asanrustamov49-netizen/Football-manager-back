import { pool } from "../plugins/pg.js";

export const postTeamService = async (body) => {
  const result = await pool.query(
    `
        insert into teams 
        (name, country, coach, logo)
        values ($1, $2, $3, $4)
        returning *
    `,
    [body.name, body.country, body.coach, body.logo],
  );

  return result.rows[0];
};
export const getTeamsService = async () => {
  const result = await pool.query(`select * from teams`);

  return result.rows;
};
export const getOneTeamService = async (id) => {
  const result = await pool.query(
    `
        select * from teams
        where id = $1
        `,
    [id],
  );

  if (!result.rows[0]) {
    throw new Error("Not Found id");
  }

  return result.rows[0];
};
export const deleteTeamService = async (id) => {
  const result = await pool.query(
    `
        delete from teams 
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
export const updateTeamService = async (id, newBody) => {
  const result = await pool.query(
    `
        update teams
        set name = $1, country = $2, coach = $3, logo = $4
        where id = $5
        returning *
        `,
    [newBody.name, newBody.country, newBody.coach, newBody.logo, id],
  );

  if (!result.rows[0]) {
    throw new Error("Not Found id");
  }

  return result.rows[0];
};
