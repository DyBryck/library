import http from "http";
import { SERVER_PORT } from "./config/config.js";
import { handleRoute } from "./routes/router.js";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  handleRoute(req, res);
});

server.listen(SERVER_PORT, () => console.log(`Serveur en écoute sur le port ${SERVER_PORT}`));
