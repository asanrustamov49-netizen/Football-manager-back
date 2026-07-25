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
    [
      newBody.name,
      newBody.age,
      newBody.image,
      newBody.salary,
      newBody.team_id,
      id,
    ],
  );

  if (!result.rows[0]) {
    throw new Error("Not Found id");
  }

  return result.rows[0];
};
export const getPlayersWithTeamService = async () => {
  const result = await pool.query(
    `
    select players.name, players.id, players.image, players.age, players.salary, players.team_id, teams.logo, teams.name as teamname, teams.country from players
    left join teams on teams.id = players.team_id
    `,
  );

  return result.rows;
};
export const getStatisticsService = async () => {
  const totalPlayers = await pool.query(`
    select count(*) as total_players
    from players
  `);

  const totalTeams = await pool.query(`
    select count(*) as total_teams
    from teams
  `);

  const averageSalary = await pool.query(`
    select avg(salary)::int as average_salary
    from players
  `);

  const highestSalary = await pool.query(`
    select max(salary) as highest_salary
    from players
  `);

  const youngestPlayer = await pool.query(`
    select name, age
    from players
    order by age asc
    limit 1
  `);

  const oldestPlayer = await pool.query(`
    select name, age
    from players
    order by age desc
    limit 1
  `);

  return {
    totalPlayers: totalPlayers.rows[0].total_players,
    totalTeams: totalTeams.rows[0].total_teams,
    averageSalary: averageSalary.rows[0].average_salary,
    highestSalary: highestSalary.rows[0].highest_salary,
    youngestPlayer: youngestPlayer.rows[0],
    oldestPlayer: oldestPlayer.rows[0],
  };
};
