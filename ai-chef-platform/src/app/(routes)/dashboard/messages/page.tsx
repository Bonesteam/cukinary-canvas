"use client";
import { useEffect, useState } from "react";

type Message = { _id: string; text: string; fromUserId: string; toUserId?: string; createdAt: string };

export default function MessagesPage() {
  const [roomId] = useState("demo-room");
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const load = async () => {
    const res = await fetch(`/api/messages/${roomId}`);
    const data = await res.json();
    setMessages(data.messages ?? []);
  };

  useEffect(() => { load(); }, [roomId]);

  const send = async () => {
    if (!text) return;
    await fetch(`/api/messages/${roomId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromUserId: "guest-demo", text }),
    });
    setText("");
    await load();
  };

  return (
    <div className="content" style={{ display: 'grid', gap: 12 }}>
      <h1>Messages</h1>
      <div className="card" style={{ height: 280, overflowY: 'auto', display: 'grid', gap: 8 }}>
        {messages.map(m => (
          <div key={m._id} style={{ padding: 8, border: '1px solid var(--color-border)', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>{new Date(m.createdAt).toLocaleString()}</div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)' }} />
        <button className="button" type="button" onClick={send}>Send</button>
      </div>
    </div>
  );
}
