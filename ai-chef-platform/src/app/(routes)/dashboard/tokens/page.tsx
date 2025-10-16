import TokenPurchaseForm from "./TokenPurchaseForm";

export default function TokensPage() {
  return (
    <div className="content">
      <h1>Tokens</h1>
      <p>View balance and purchase tokens.</p>
      <TokenPurchaseForm />
    </div>
  );
}
