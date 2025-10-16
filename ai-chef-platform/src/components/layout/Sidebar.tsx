import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
          <li><Link href="/(routes)/dashboard">Overview</Link></li>
          <li><Link href="/(routes)/dashboard/tokens">Token Balance</Link></li>
          <li><Link href="/(routes)/dashboard/plans/ai">AI Plan</Link></li>
          <li><Link href="/(routes)/dashboard/plans/personal">Personal Plan</Link></li>
          <li><Link href="/(routes)/dashboard/messages">Messages</Link></li>
          <li><Link href="/(routes)/dashboard/history">History</Link></li>
          <li><Link href="/(routes)/chef">Chef Portal</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
