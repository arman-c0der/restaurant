import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, 
    required: true,
    trim: true, unique: true }, // "Mains", "Breakfast"
    slug: { type: String, 
      required: true, 
      trim: true, 
      lowercase: true, 
      unique: true }, // "mains", "breakfast"
    description: { type: String, default: "" },
    order: { type: Number, default: 0 }, // display sequence
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema, "categories");