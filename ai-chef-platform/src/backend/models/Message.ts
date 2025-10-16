import { Schema, InferSchemaType, model, models } from "mongoose";

const MessageSchema = new Schema({
  roomId: { type: String, index: true, required: true },
  fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  toUserId: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  readAt: { type: Date },
}, { timestamps: true });

export type MessageDoc = InferSchemaType<typeof MessageSchema> & { _id: string };

export default models.Message || model("Message", MessageSchema);
