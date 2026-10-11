# WebSocket Chat

コードを読んで WebSocket の基本を理解するための最小アプリです。

## 起動

```bash
npm install
npm start
```

<http://localhost:8787> を2つのブラウザタブで開き、片方からメッセージを送ってください。両方のタブに同じメッセージが表示されます。

## 読む順番

1. `public/index.html` の `new WebSocket()`
2. `socket.send()`
3. `server.mjs` の `wss.on("connection")`
4. `socket.on("message")`
5. `client.send()`
6. `public/index.html` の `socket.addEventListener("message")`
