import { Schema, InferSchemaType, model, models } from "mongoose";

const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["purchase", "consume", "refund"], required: true },
  amountTokens: { type: Number, required: true },
  currency: { type: String, enum: ["GBP", "EUR"], default: "GBP" },
  amountCurrency: { type: Number },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

export type TransactionDoc = InferSchemaType<typeof TransactionSchema> & { _id: string };

export default models.Transaction || model("Transaction", TransactionSchema);
