"use client";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { calculateTotalTokens, TokenCostItem } from "@/backend/utils/tokenCalculator";

const GOALS: TokenCostItem[] = [
  { key: "activity", label: "Activity level", cost: 5 },
  { key: "calorie_method", label: "Calorie method", cost: 5 },
  { key: "protein_target", label: "Protein target", cost: 5 },
  { key: "metrics", label: "Personal metrics", cost: 5 },
];

const STRUCTURE: TokenCostItem[] = [
  { key: "meals_per_day", label: "Meals per day", cost: 5 },
  { key: "snacks", label: "Snacks", cost: 5 },
  { key: "fasting", label: "Intermittent fasting", cost: 10 },
  { key: "leftovers", label: "Leftovers strategy", cost: 5 },
];

const DIET: TokenCostItem[] = [
  { key: "mediterranean", label: "Mediterranean", cost: 5 },
  { key: "high_protein", label: "High-protein", cost: 5 },
  { key: "low_carb", label: "Low-carb", cost: 5 },
  { key: "vegan", label: "Vegan", cost: 5 },
  { key: "vegetarian", label: "Vegetarian", cost: 5 },
  { key: "pescatarian", label: "Pescatarian", cost: 5 },
  { key: "keto_lite", label: "Keto-lite", cost: 10 },
];

const EXTRAS: TokenCostItem[] = [
  { key: "complexity", label: "Recipe complexity", cost: 5 },
  { key: "cook_time", label: "Cooking time pref.", cost: 5 },
  { key: "equipment", label: "Equipment availability", cost: 5 },
  { key: "nutrition_focus", label: "Nutritional focus", cost: 5 },
  { key: "occasion", label: "Special occasions", cost: 5 },
  { key: "shopping_list", label: "Shopping list", cost: 10 },
  { key: "video_tutorials", label: "Video tutorials", cost: 10 },
];

function Toggle({ item, onChange, selected }: { item: TokenCostItem; onChange: (i: TokenCostItem, checked: boolean) => void; selected: boolean }) {
  return (
    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10, border: '1px solid var(--color-border)', borderRadius: 10 }}>
      <span>{item.label}</span>
      <input type="checkbox" checked={selected} onChange={(e) => onChange(item, e.target.checked)} />
    </label>
  );
}

export function PlanConfigurator() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);
  const { data: session } = useSession();

  const items = [...GOALS, ...STRUCTURE, ...DIET, ...EXTRAS];
  const selectedItems = items.filter(i => selectedKeys.has(i.key));
  const total = calculateTotalTokens(selectedItems);

  const toggle = (item: TokenCostItem, checked: boolean) => {
    const next = new Set(selectedKeys);
    if (checked) next.add(item.key); else next.delete(item.key);
    setSelectedKeys(next);
  };

  const generate = async () => {
    if (!session?.userId) {
      await signIn();
      return;
    }
    setLoading(true);
    setResult(null);
    setPlanId(null);
    const payload = {
      userId: session.userId,
      selections: selectedItems,
      notes: "",
    };
    const res = await fetch("/api/plans/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (res.ok) {
      setResult(data.result || "");
      setPlanId(data.planId);
    } else {
      setResult(data.error || "Error generating plan");
    }
    setLoading(false);
  };

  return (
    <div className="card" style={{ display: 'grid', gap: 16 }}>
      <h3>Meal Plan Configuration</h3>

      <section>
        <h4>Goals</h4>
        <div style={{ display: 'grid', gap: 8 }}>
          {GOALS.map(g => (
            <Toggle key={g.key} item={g} selected={selectedKeys.has(g.key)} onChange={toggle} />
          ))}
        </div>
      </section>

      <section>
        <h4>Structure</h4>
        <div style={{ display: 'grid', gap: 8 }}>
          {STRUCTURE.map(s => (
            <Toggle key={s.key} item={s} selected={selectedKeys.has(s.key)} onChange={toggle} />
          ))}
        </div>
      </section>

      <section>
        <h4>Diet</h4>
        <div style={{ display: 'grid', gap: 8 }}>
          {DIET.map(d => (
            <Toggle key={d.key} item={d} selected={selectedKeys.has(d.key)} onChange={toggle} />
          ))}
        </div>
      </section>

      <section>
        <h4>Extras</h4>
        <div style={{ display: 'grid', gap: 8 }}>
          {EXTRAS.map(x => (
            <Toggle key={x.key} item={x} selected={selectedKeys.has(x.key)} onChange={toggle} />
          ))}
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Total: {total} tokens</strong>
        <button className="button" type="button" onClick={generate} disabled={loading || total === 0}>{loading ? 'Generating…' : 'Generate Plan'}</button>
      </div>

      {result && (
        <div className="card" style={{ marginTop: 8 }}>
          <h4>AI Plan Result</h4>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
          {planId && (
            <a className="button" href={`/api/plans/pdf/${planId}`} style={{ marginTop: 8, display: 'inline-block' }}>Download PDF</a>
          )}
        </div>
      )}
    </div>
  );
}
