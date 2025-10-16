import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
          <li><Link href="/dashboard">Overview</Link></li>
          <li><Link href="/dashboard/tokens">Token Balance</Link></li>
          <li><Link href="/dashboard/plans/ai">AI Plan</Link></li>
          <li><Link href="/dashboard/plans/personal">Personal Plan</Link></li>
          <li><Link href="/dashboard/messages">Messages</Link></li>
          <li><Link href="/dashboard/history">History</Link></li>
          <li><Link href="/chef">Chef Portal</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
