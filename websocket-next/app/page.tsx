"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const socketRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://${location.host}/ws`);
    socketRef.current = socket;

    const receiveMessage = (event: MessageEvent<string>) => {
      setMessages((current) => [...current, event.data]);
    };

    socket.addEventListener("message", receiveMessage);

    return () => {
      socket.removeEventListener("message", receiveMessage);
      socket.close();
      socketRef.current = null;
    };
  }, []);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message || socketRef.current?.readyState !== WebSocket.OPEN) {
      return;
    }

    socketRef.current.send(message);
    setMessage("");
  }

  return (
    <main>
      <h1>WebSocket Chat</h1>

      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="メッセージ"
          autoComplete="off"
        />
        <button type="submit">送信</button>
      </form>

      <ul>
        {messages.map((receivedMessage, index) => (
          <li key={`${index}-${receivedMessage}`}>{receivedMessage}</li>
        ))}
      </ul>
    </main>
  );
}
