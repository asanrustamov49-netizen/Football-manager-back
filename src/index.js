import http from "http";
import "dotenv/config";
import { teamRouter } from "./routes/team.route.js";
import { playerRouter } from "./routes/player.route.js";

const server = http.createServer((req, res) => {
  console.log(`Method: ${req.method}, time: ${new Date()} ====> ${req.url}`);

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://football-manager-front-eta.vercel.app",
  ); // Или '*' для всех
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (teamRouter(req, res)) return;
  if (playerRouter(req, res)) return;
});
const port = 5000;

server.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});
