"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import Item from "@/models/Items";
import Category from "@/models/Category";
import mongoose from "mongoose";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

const toList = (v) =>
  String(v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// Form er category dropdown er jonno
export async function getCategoryNames() {
  try {
    await requireAdmin();
    await dbConnect();
    const docs = await Category.find({}).sort({ order: 1 }).lean();
    return docs.map((c) => c.name);
  } catch (err) {
    console.error("getCategoryNames error:", err.message);
    return [];
  }
}

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "restaurant/items" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });
}

export async function createItem(formData) {
  try {
    await requireAdmin();

    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const badge = String(formData.get("badge") || "").trim();
    const price = Number(formData.get("price"));
    const file = formData.get("image");

    if (!name) return { ok: false, error: "Name dewa jaruri." };
    if (!category) return { ok: false, error: "Category select korun." };
    if (Number.isNaN(price) || price < 0)
      return { ok: false, error: "Price thik moto din." };

    // Image upload
    let image = "";
    if (file && typeof file !== "string" && file.size > 0) {
      if (!ALLOWED_TYPES.includes(file.type))
        return { ok: false, error: "Shudhu JPG, PNG ba WEBP dewa jabe." };
      if (file.size > MAX_SIZE)
        return { ok: false, error: "Image 5MB er cheye boro hobe na." };

      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadToCloudinary(buffer);
      image = result.secure_url;
    } else {
      return { ok: false, error: "Ekta image select korun." };
    }

    await dbConnect();
    await Item.create({
      name,
      description,
      image,
      price,
      category,
      dietary: toList(formData.get("dietary")),
      allergens: toList(formData.get("allergens")),
      badge,
      available: formData.get("available") === "on",
    });

    revalidatePath("/");
    revalidatePath("/menu");
    revalidatePath("/admin/items");

    return { ok: true };
  } catch (err) {
    console.error("createItem error:", err.message);
    return { ok: false, error: "Item add kora gelo na. Abar try korun." };
  }
}

/* ---------- Helpers ---------- */

function serializeAdmin(d) {
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
    available: d.available !== false,
  };
}

// Cloudinary URL theke public_id ber kore image delete kore
async function deleteCloudinaryImage(url) {
  try {
    if (!url || !url.includes("res.cloudinary.com")) return;
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z0-9]+$/i);
    const publicId = match?.[1];
    // shudhu amader folder er image delete hobe
    if (publicId && publicId.startsWith("restaurant/items/")) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (err) {
    console.error("deleteCloudinaryImage error:", err.message);
  }
}

/* ---------- Read ---------- */

// Admin list: hidden item shoho shob
export async function getAdminItems() {
  try {
    await requireAdmin();
    await dbConnect();
    const docs = await Item.find({}).sort({ category: 1, name: 1 }).lean();
    return docs.map(serializeAdmin);
  } catch (err) {
    console.error("getAdminItems error:", err.message);
    return [];
  }
}

// Edit page er jonno ekta item
export async function getItemById(id) {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(id)) return null;
    await dbConnect();
    const doc = await Item.findById(id).lean();
    return doc ? serializeAdmin(doc) : null;
  } catch (err) {
    console.error("getItemById error:", err.message);
    return null;
  }
}

/* ---------- Update ---------- */

export async function updateItem(id, formData) {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(id))
      return { ok: false, error: "Invalid item id." };

    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const badge = String(formData.get("badge") || "").trim();
    const price = Number(formData.get("price"));
    const file = formData.get("image");

    if (!name) return { ok: false, error: "Name dewa jaruri." };
    if (!category) return { ok: false, error: "Category select korun." };
    if (Number.isNaN(price) || price < 0)
      return { ok: false, error: "Price thik moto din." };

    await dbConnect();
    const existing = await Item.findById(id);
    if (!existing) return { ok: false, error: "Item pawa jayni." };

    // Notun image select korle upload, na korle purono-i thakbe
    let image = existing.image;
    let oldImage = "";
    if (file && typeof file !== "string" && file.size > 0) {
      if (!ALLOWED_TYPES.includes(file.type))
        return { ok: false, error: "Shudhu JPG, PNG ba WEBP dewa jabe." };
      if (file.size > MAX_SIZE)
        return { ok: false, error: "Image 5MB er cheye boro hobe na." };

      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadToCloudinary(buffer);
      oldImage = existing.image;
      image = result.secure_url;
    }

    existing.set({
      name,
      description,
      image,
      price,
      category,
      dietary: toList(formData.get("dietary")),
      allergens: toList(formData.get("allergens")),
      badge,
      available: formData.get("available") === "on",
    });
    await existing.save();

    // DB save hoye gele purono image Cloudinary theke muche felo
    if (oldImage) await deleteCloudinaryImage(oldImage);

    revalidatePath("/");
    revalidatePath("/menu");
    revalidatePath("/admin/items");

    return { ok: true };
  } catch (err) {
    console.error("updateItem error:", err.message);
    return { ok: false, error: "Update kora gelo na. Abar try korun." };
  }
}

/* ---------- Delete ---------- */

export async function deleteItem(id) {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(id))
      return { ok: false, error: "Invalid item id." };

    await dbConnect();
    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) return { ok: false, error: "Item pawa jayni." };

    await deleteCloudinaryImage(deleted.image);

    revalidatePath("/");
    revalidatePath("/menu");
    revalidatePath("/admin/items");

    return { ok: true };
  } catch (err) {
    console.error("deleteItem error:", err.message);
    return { ok: false, error: "Delete kora gelo na. Abar try korun." };
  }
}