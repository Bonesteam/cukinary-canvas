import { TOKEN_PACKAGES } from "@/data/tokenPackages";
import { formatGBP } from "@/utils/formatCurrency";

export default function TokensPage() {
  return (
    <div className="content">
      <h1>Tokens</h1>
      <p>View balance and purchase tokens.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
        {TOKEN_PACKAGES.map(pkg => (
          <div key={pkg.id} className="card">
            <h3>{pkg.name}</h3>
            <p>{pkg.tokens} tokens</p>
            <p>{formatGBP(pkg.priceGBP)}</p>
            <form method="post" action="/api/tokens/purchase">
              <input type="hidden" name="tokens" value={pkg.tokens} />
              <button className="button" type="button">Buy</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
