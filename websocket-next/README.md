# WebSocket Chat (Next.js + TypeScript)

コードを読んで WebSocket の基本を理解するための最小アプリです。

## 起動

```bash
npm install
npm run dev
```

<http://localhost:8787> を2つのブラウザタブで開き、片方からメッセージを送ってください。両方のタブに同じメッセージが表示されます。

本番相当で起動する場合は、次を実行します。

```bash
npm run build
npm start
```

## 読む順番

1. `app/page.tsx` の `new WebSocket()`
2. `sendMessage()` 内の `socket.send()`
3. `server.mjs` の `wss.on("connection")`
4. `socket.on("message")`
5. `client.send()`
6. `app/page.tsx` の `socket.addEventListener("message")`

WebSocket は `/ws` に接続します。Next.js の開発用 WebSocket と区別しつつ、画面と同じポート `8787` を使っています。
