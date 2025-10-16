export type PlanType = "ai" | "personal";

export interface MealPlan {
  _id: string;
  userId: string;
  type: PlanType;
  config: Record<string, unknown>;
  status: "pending" | "in_progress" | "ready" | "delivered";
  pdfUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
