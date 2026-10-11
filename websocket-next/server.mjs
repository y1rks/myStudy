import { createServer } from "node:http";
import next from "next";
import { WebSocket, WebSocketServer } from "ws";

const port = Number(process.env.PORT ?? 8787);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

await app.prepare();

const handleRequest = app.getRequestHandler();
const handleUpgrade = app.getUpgradeHandler();

const server = createServer((request, response) => {
  handleRequest(request, response);
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url ?? "/", `http://${request.headers.host}`).pathname;

  if (pathname === "/ws") {
    wss.handleUpgrade(request, socket, head, (webSocket) => {
      wss.emit("connection", webSocket, request);
    });
    return;
  }

  handleUpgrade(request, socket, head);
});

wss.on("connection", (socket) => {
  console.log("connected");

  socket.on("message", (message) => {
    for (const client of wss.clients) {
      console.log(client.readyState);

      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    }
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
