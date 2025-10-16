import { Schema, InferSchemaType, model, models } from "mongoose";

const ChefRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  assignedChefId: { type: Schema.Types.ObjectId, ref: "User" },
  details: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ["new", "assigned", "in_progress", "submitted", "completed"], default: "new" },
}, { timestamps: true });

export type ChefRequestDoc = InferSchemaType<typeof ChefRequestSchema> & { _id: string };

export default models.ChefRequest || model("ChefRequest", ChefRequestSchema);
