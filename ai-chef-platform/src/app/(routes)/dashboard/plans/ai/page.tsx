import { PlanConfigurator } from "@/components/forms/PlanConfigurator";
import "./styles.scss";

export default function AIChefConfiguratorPage() {
  return (
    <div className="content" style={{ display: 'grid', gap: 16 }}>
      <h1>AI Chef</h1>
      <PlanConfigurator />
    </div>
  );
}
