"use client";
import { Card } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function TokenBalanceCard() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number | null>(null);
  useEffect(() => {
    const email = (session as any)?.user?.email || (session as any)?.email;
    if (!email) return;
    fetch(`/api/tokens/balance?email=${encodeURIComponent(email)}`).then(r => r.json()).then(d => setBalance(d.tokens)).catch(() => setBalance(0));
  }, [session]);
  return (
    <Card>
      <h3>Token Balance</h3>
      <p><strong>{balance ?? '—'}</strong> tokens</p>
    </Card>
  );
}
