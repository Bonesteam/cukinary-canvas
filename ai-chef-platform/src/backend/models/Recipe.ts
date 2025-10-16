import { Schema, InferSchemaType, model, models } from "mongoose";

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  cuisine: { type: String },
  dietTags: [{ type: String }],
  allergens: [{ type: String }],
  calories: { type: Number },
  protein: { type: Number },
  carbs: { type: Number },
  fats: { type: Number },
}, { timestamps: true });

export type RecipeDoc = InferSchemaType<typeof RecipeSchema> & { _id: string };

export default models.Recipe || model("Recipe", RecipeSchema);
