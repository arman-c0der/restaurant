"use server";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { auth, signOut, unstable_update } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requireAdminId() {
  const session = await auth();
  if (
    !session?.user?.id ||
    session.user.role !== "admin" ||
    !mongoose.isValidObjectId(session.user.id)
  ) {
    return null;
  }
  return session.user.id;
}

// Settings page er jonno
export async function getAccount() {
  try {
    const id = await requireAdminId();
    if (!id) return null;
    await dbConnect();
    const u = await User.findById(id).lean();
    if (!u) return null;
    return {
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : "",
    };
  } catch (err) {
    console.error("getAccount error:", err.message);
    return null;
  }
}

export async function updateProfile(formData) {
  let emailChanged = false;
  let newName = "";

  try {
    const id = await requireAdminId();
    if (!id) return { ok: false, error: "Unauthorized" };

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const current = String(formData.get("current") || "");

    if (!name) return { ok: false, error: "Name dewa jaruri." };
    if (!EMAIL_RE.test(email)) return { ok: false, error: "Valid email din." };

    await dbConnect();
    const user = await User.findById(id);
    if (!user) return { ok: false, error: "User pawa jayni." };

    emailChanged = email !== user.email;

    if (emailChanged) {
      if (!current)
        return { ok: false, error: "Email change korte current password din." };
      const valid = await bcrypt.compare(current, user.password);
      if (!valid) return { ok: false, error: "Current password vul." };

      const taken = await User.findOne({ email, _id: { $ne: user._id } }).lean();
      if (taken) return { ok: false, error: "Ei email age thekei ache." };

      user.email = email;
    }

    user.name = name;
    await user.save();
    newName = name;
  } catch (err) {
    console.error("updateProfile error:", err.message);
    return { ok: false, error: "Profile update kora gelo na." };
  }

  // try/catch er baire, karon signOut redirect throw kore
  if (emailChanged) {
    await signOut({ redirectTo: "/admin/login" });
  }

  await unstable_update({ user: { name: newName } });
  return { ok: true, emailChanged: false };
}

export async function changePassword(formData) {
  try {
    const id = await requireAdminId();
    if (!id) return { ok: false, error: "Unauthorized" };

    const current = String(formData.get("current") || "");
    const next = String(formData.get("next") || "");
    const confirm = String(formData.get("confirm") || "");

    if (next.length < 8)
      return { ok: false, error: "New password minimum 8 character hote hobe." };
    if (next !== confirm)
      return { ok: false, error: "Password duto mile nai." };
    if (next === current)
      return { ok: false, error: "Notun password ager ta theke alada hote hobe." };

    await dbConnect();
    const user = await User.findById(id);
    if (!user) return { ok: false, error: "User pawa jayni." };

    const valid = await bcrypt.compare(current, user.password);
    if (!valid) return { ok: false, error: "Current password vul." };

    user.password = await bcrypt.hash(next, 12);
    await user.save();

    return { ok: true };
  } catch (err) {
    console.error("changePassword error:", err.message);
    return { ok: false, error: "Password change kora gelo na." };
  }
}