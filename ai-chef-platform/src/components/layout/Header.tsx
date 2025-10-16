import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <Link href="/">AI Chef</Link>
        </div>
        <nav className="nav">
          <Link href="/(routes)/dashboard">Dashboard</Link>
          <Link href="/(routes)/dashboard/tokens">Tokens</Link>
          <Link href="/(routes)/dashboard/plans/ai">AI Chef</Link>
          <Link href="/(routes)/dashboard/plans/personal">Personal Chef</Link>
          <Link href="/(routes)/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
