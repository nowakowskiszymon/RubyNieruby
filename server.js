const http = require("http");

const app = require("./app");

// ustawiam port
const port = process.env.port || 3000;

// tworzę serwer
const server = http.createServer(app);

// odpalam serwer
server.listen(port);

