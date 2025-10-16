"use client";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useEffect, useState } from "react";

export function Header() {
  const [eur, setEur] = useState<number | null>(null);
  useEffect(() => {
    fetch('/api/rates').then(r => r.json()).then(d => setEur(d.EUR)).catch(() => setEur(null));
  }, []);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'var(--color-muted)', fontSize: 12 }}>GBP/EUR {eur ? eur.toFixed(2) : '—'}</div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
