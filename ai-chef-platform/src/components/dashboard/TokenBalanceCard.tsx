import { Card } from "@/components/ui/Card";

export function TokenBalanceCard() {
  // Placeholder: real balance will come from API
  const balance = 0;
  return (
    <Card>
      <h3>Token Balance</h3>
      <p><strong>{balance}</strong> tokens</p>
    </Card>
  );
}
