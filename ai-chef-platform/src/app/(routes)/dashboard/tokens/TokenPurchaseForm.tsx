"use client";
import { useState } from "react";
import { TOKEN_PACKAGES } from "@/data/tokenPackages";
import { formatGBP } from "@/utils/formatCurrency";

export default function TokenPurchaseForm() {
  const [customTokens, setCustomTokens] = useState<number>(0);

  const buy = async (tokens: number) => {
    await fetch("/api/tokens/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "demo@example.com", tokens, currency: "GBP", amount: tokens / 100 }),
    });
    alert("Purchased " + tokens + " tokens");
  };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {TOKEN_PACKAGES.map(pkg => (
          <div key={pkg.id} className="card">
            <h3>{pkg.name}</h3>
            <p>{pkg.tokens} tokens</p>
            <p>{formatGBP(pkg.priceGBP)}</p>
            <button className="button" type="button" onClick={() => buy(pkg.tokens)}>Buy</button>
          </div>
        ))}
        <div className="card">
          <h3>Custom</h3>
          <label>
            Tokens
            <input type="number" value={customTokens} onChange={(e) => setCustomTokens(parseInt(e.target.value || "0", 10))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)' }} />
          </label>
          <button className="button" type="button" onClick={() => buy(customTokens)} disabled={!customTokens || customTokens < 100}>Buy</button>
        </div>
      </div>
    </div>
  );
}
