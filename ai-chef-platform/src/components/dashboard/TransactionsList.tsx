"use client";
import { Card } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Tx = { _id: string; type: string; amountTokens: number; currency: string; amountCurrency?: number; createdAt: string };

export function TransactionsList() {
  const { data: session } = useSession();
  const [txs, setTxs] = useState<Tx[]>([]);

  useEffect(() => {
    const email = session?.user?.email ?? null;
    if (!email) return;
    fetch(`/api/transactions?email=${encodeURIComponent(email)}`).then(r => r.json()).then(d => setTxs(d.transactions || [])).catch(() => setTxs([]));
  }, [session]);

  return (
    <Card>
      <h3>Recent Transactions</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {txs.length === 0 && <li>No transactions yet.</li>}
        {txs.slice(0,5).map(t => (
          <li key={t._id}>
            {new Date(t.createdAt).toLocaleString()} — {t.type} — {t.amountTokens} tokens
          </li>
        ))}
      </ul>
    </Card>
  );
}
