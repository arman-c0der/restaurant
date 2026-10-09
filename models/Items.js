import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    price: { type: Number, default: 0, min: 0 },
    category: { type: String, required: true }, // "Mains", "Breakfast"
    dietary: { type: [String], default: [] },   // ["V", "VG", "GF"]
    allergens: { type: [String], default: [] }, // ["Gluten", "Dairy"]
    badge: { type: String, default: "" },       // "Chef's Pick"
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Item ||
  mongoose.model("Item", ItemSchema, "items");