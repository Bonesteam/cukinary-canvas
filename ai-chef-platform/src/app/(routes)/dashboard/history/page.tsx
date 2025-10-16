import Link from "next/link";

export default async function HistoryPage() {
  // Placeholder: list last 10 plans and transactions via API
  const plansRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/plans`, { cache: "no-store" });
  await plansRes.json().catch(() => ({ ok: true }));

  return (
    <div className="content" style={{ display: 'grid', gap: 16 }}>
      <h1>History</h1>
      <div className="card">
        <h3>Meal Plans</h3>
        <p>Plans endpoint stubbed. This will show latest plans with links to PDF.</p>
        <Link href="/(routes)/dashboard/plans/ai" className="button">Create AI Plan</Link>
      </div>
      <div className="card">
        <h3>Transactions</h3>
        <p>Your token purchases and consumption will appear here.</p>
      </div>
    </div>
  );
}
