import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { WebSocketServer, WebSocket } from "ws";

const server = createServer(async (_request, response) => {
  const html = await readFile("./public/index.html");
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(html);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (message) => {
    for (const client of wss.clients) {
      // dumpしてみる
      console.log(client.readyState);
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    }
  });
});

server.listen(8787, () => {
  console.log("http://localhost:8787");
});
