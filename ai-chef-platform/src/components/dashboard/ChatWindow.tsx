"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";

export function ChatWindow() {
  const [message, setMessage] = useState("");
  return (
    <Card>
      <h3>Chef Chat</h3>
      <div style={{ height: 160, border: '1px solid var(--color-border)', borderRadius: 8, marginTop: 8, marginBottom: 8 }} />
      <form onSubmit={(e) => { e.preventDefault(); setMessage(""); }} style={{ display: 'flex', gap: 8 }}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)' }} />
        <button className="button" type="submit">Send</button>
      </form>
    </Card>
  );
}
