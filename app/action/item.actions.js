"use server";

import dbConnect from "@/lib/dbConnect";
import Item from "@/models/Items";

// ObjectId/Date client component e pathano jay na, tai plain object banano
function serialize(d) {
  return {
    id: d._id.toString(),
    name: d.name,
    description: d.description || "",
    image: d.image || "",
    price: d.price ?? 0,
    category: d.category,
    dietary: d.dietary || [],
    allergens: d.allergens || [],
    badge: d.badge || "",
  };
}

// Shob available item
export async function getItems() {
  try {
    await dbConnect();
    const docs = await Item.find({ available: { $ne: false } })
      .sort({ category: 1, name: 1 })
      .lean();
    return docs.map(serialize);
  } catch (err) {
    console.error("getItems error:", err.message);
    return [];
  }
}

// Home page er jonno: featured / prothom 3 ta
export async function getFeaturedItems(limit = 3) {
  try {
    await dbConnect();
    const docs = await Item.find({ available: { $ne: false } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return docs.map(serialize);
  } catch (err) {
    console.error("getFeaturedItems error:", err.message);
    return [];
  }
}

// Category list (Mains, Breakfast...)
export async function getCategories() {
  try {
    await dbConnect();
    const cats = await Item.distinct("category", { available: true });
    return cats.sort();
  } catch (err) {
    console.error("getCategories error:", err.message);
    return [];
  }
}