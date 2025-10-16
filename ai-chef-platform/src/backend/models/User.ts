import { Schema, InferSchemaType, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  image: { type: String },
  role: { type: String, enum: ["customer", "chef"], default: "customer" },
  tokens: { type: Number, default: 0 },
}, { timestamps: true });

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: string };

export default models.User || model("User", UserSchema);
