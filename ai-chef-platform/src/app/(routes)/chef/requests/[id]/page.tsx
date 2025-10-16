"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ChefRequestChatPage() {
  const params = useParams<{ id: string }>();
  const roomId = params.id;
  const { data: session } = useSession();
  type Msg = { _id: string; text: string; createdAt: string };
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");

  const load = async () => {
    const r = await fetch(`/api/messages/${roomId}`);
    const d = await r.json();
    setMessages(d.messages || []);
  };
  useEffect(() => { load(); }, [roomId]);

  const send = async () => {
    const fromUserId = (session as { userId?: string } | null)?.userId || 'chef-demo';
    await fetch(`/api/messages/${roomId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fromUserId, text }) });
    setText("");
    await load();
  };

  return (
    <div className="content" style={{ display: 'grid', gap: 12 }}>
      <h1>Request Chat</h1>
      <div className="card" style={{ height: 320, overflowY: 'auto', display: 'grid', gap: 8 }}>
        {messages.map((m) => (
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
