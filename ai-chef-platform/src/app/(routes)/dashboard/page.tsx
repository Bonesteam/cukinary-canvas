import { Sidebar } from "@/components/layout/Sidebar";
import { TokenBalanceCard } from "@/components/dashboard/TokenBalanceCard";
import { PlanList } from "@/components/dashboard/PlanList";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <div className="content">
        <h1>Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TokenBalanceCard />
          <PlanList />
        </div>
      </div>
    </div>
  );
}
