"use client";
import { Card } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Plan = { _id: string; type: string; status: string; createdAt: string };

export function PlanList() {
  const { data: session } = useSession();
  const [plans, setPlans] = useState<Plan[]>([]);
  useEffect(() => {
    const email = session?.user?.email ?? null;
    if (!email) return;
    fetch(`/api/plans?email=${encodeURIComponent(email)}`).then(r => r.json()).then(d => setPlans(d.plans || [])).catch(() => setPlans([]));
  }, [session]);
  return (
    <Card>
      <h3>Recent Plans</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {plans.length === 0 && <li>No plans yet.</li>}
        {plans.slice(0,5).map(p => (
          <li key={p._id}>
            {new Date(p.createdAt).toLocaleString()} — {p.type.toUpperCase()} — {p.status}
          </li>
        ))}
      </ul>
    </Card>
  );
}
