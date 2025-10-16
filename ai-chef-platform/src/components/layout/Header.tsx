"use client";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export function Header() {
  const [eur, setEur] = useState<number | null>(null);
  const { data: session } = useSession();
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
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/tokens">Tokens</Link>
          <Link href="/dashboard/plans/ai">AI Chef</Link>
          <Link href="/dashboard/plans/personal">Personal Chef</Link>
          <Link href="/about">About</Link>
          {session?.role === 'chef' && <Link href="/chef">Chef</Link>}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'var(--color-muted)', fontSize: 12 }}>GBP/EUR {eur ? eur.toFixed(2) : '—'}</div>
          <LanguageSwitcher />
          {session ? (
            <>
              <span style={{ color: 'var(--color-muted)', fontSize: 12 }}>{session.user?.email ?? ''}</span>
              <button className="button ghost" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
            </>
          ) : (
            <button className="button ghost" onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}>Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}
