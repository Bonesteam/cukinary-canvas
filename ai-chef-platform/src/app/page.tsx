import Link from "next/link";

export default function Home() {
  return (
    <div className="content" style={{ display: 'grid', gap: 24 }}>
      <section className="card" style={{ marginTop: 24, padding: 32 }}>
        <h1 style={{ fontSize: 36, margin: 0 }}>Cook smart. Eat better.</h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: 720 }}>
          AI Chef creates instant meal plans tailored to your goals, diet and schedule. Prefer a human touch? A Personal Chef will craft a bespoke plan and deliver it to your inbox within 2–3 hours.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <Link className="button" href="/dashboard/plans/ai">Create AI Plan</Link>
          <Link className="button ghost" href="/dashboard/plans/personal">Request Personal Chef</Link>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div className="card">
          <h3>Token System</h3>
          <p>1.00 GBP = 100 tokens. Add more options to personalize your plan and spend tokens only for what you need.</p>
        </div>
        <div className="card">
          <h3>GBP/EUR</h3>
          <p>Pay in GBP or EUR. Prices are computed from GBP with real-time conversion.</p>
        </div>
        <div className="card">
          <h3>Download & Email</h3>
          <p>Get your plan as a downloadable PDF and receive it via email.</p>
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: 8 }}>
        <h2 style={{ margin: 0 }}>How it works</h2>
        <ol style={{ paddingLeft: 18, margin: 0, color: 'var(--color-muted)' }}>
          <li>Choose AI Chef or Personal Chef.</li>
          <li>Select goals, structure, diet and extras.</li>
          <li>Generate instantly with AI or wait 2–3 hours for a chef.</li>
          <li>Download the PDF or receive it via email.</li>
        </ol>
      </section>
    </div>
  );
}
