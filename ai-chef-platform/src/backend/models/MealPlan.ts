import { Schema, InferSchemaType, model, models } from "mongoose";

const MealPlanSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["ai", "personal"], required: true },
  config: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ["pending", "in_progress", "ready", "delivered"], default: "pending" },
  pdfUrl: { type: String },
}, { timestamps: true });

export type MealPlanDoc = InferSchemaType<typeof MealPlanSchema> & { _id: string };

export default models.MealPlan || model("MealPlan", MealPlanSchema);
