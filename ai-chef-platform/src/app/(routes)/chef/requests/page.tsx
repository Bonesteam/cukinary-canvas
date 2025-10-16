"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Req = { _id: string; status: string; userId: string; assignedChefId?: string };

export default function ChefRequestsPage() {
  const [items, setItems] = useState<Req[]>([]);
  const load = async () => {
    const r = await fetch('/api/chef/requests');
    const d = await r.json();
    setItems(d.requests || []);
  };
  useEffect(() => { load(); }, []);

  const assignToMe = async (id: string) => {
    await fetch('/api/chef/assign', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId: id }) });
    await load();
  };

  return (
    <div className="content" style={{ display: 'grid', gap: 12 }}>
      <h1>Chef Requests</h1>
      <div className="card" style={{ display: 'grid', gap: 8 }}>
        {items.map(req => (
          <div key={req._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 8, padding: 8 }}>
            <div>
              <div><strong>{req.status}</strong></div>
              <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>Request #{req._id}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {!req.assignedChefId && <button className="button" onClick={() => assignToMe(req._id)}>Assign to me</button>}
              <Link className="button ghost" href={`/chef/requests/${req._id}`}>Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
