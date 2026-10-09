"use server";

import mongoose from "mongoose";
import { randomInt } from "crypto";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Reservation from "@/models/Resevation";
import { TIME_SLOTS, TABLES_PER_SLOT, MAX_GUESTS } from "@/lib/reservationConfig";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\s-]{7,20}$/;
const STATUSES = ["pending", "confirmed", "cancelled"];
const ACTIVE = ["pending", "confirmed"]; // ei status gulo table dhore rakhe

// Restaurant er local date (YYYY-MM-DD)
function todayUK() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

function serialize(d) {
  return {
    id: d._id.toString(),
    reference: d.reference,
    name: d.name,
    email: d.email,
    phone: d.phone,
    guests: d.guests,
    date: d.date,
    time: d.time,
    status: d.status,
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : "",
  };
}

/* ---------- Public: availability ---------- */

// Return: { "2026-10-10": ["19:00", "20:00"] }  (shudhu full slot gulo)
export async function getBookedSlots(from, to) {
  try {
    if (!DATE_RE.test(from) || !DATE_RE.test(to)) return {};
    await dbConnect();

    const rows = await Reservation.aggregate([
      { $match: { date: { $gte: from, $lte: to }, status: { $in: ACTIVE } } },
      { $group: { _id: { date: "$date", time: "$time" }, count: { $sum: 1 } } },
      { $match: { count: { $gte: TABLES_PER_SLOT } } },
    ]);

    const map = {};
    for (const r of rows) {
      (map[r._id.date] ||= []).push(r._id.time);
    }
    return map;
  } catch (err) {
    console.error("getBookedSlots error:", err.message);
    return {};
  }
}

/* ---------- Public: create ---------- */

export async function createReservation(data) {
  try {
    const name = String(data?.name || "").trim();
    const email = String(data?.email || "").trim().toLowerCase();
    const phone = String(data?.phone || "").trim();
    const guests = Number(data?.guests);
    const date = String(data?.date || "");
    const time = String(data?.time || "");

    if (!name) return { ok: false, error: "Please enter your name." };
    if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email." };
    if (!PHONE_RE.test(phone)) return { ok: false, error: "Please enter a valid phone number." };
    if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS)
      return { ok: false, error: "Invalid number of guests." };
    if (!DATE_RE.test(date)) return { ok: false, error: "Please select a date." };
    if (date < todayUK()) return { ok: false, error: "You cannot book a past date." };
    if (!TIME_SLOTS.includes(time)) return { ok: false, error: "Please select a valid time." };

    await dbConnect();

    // Slot full kina server e abar check
    const taken = await Reservation.countDocuments({
      date,
      time,
      status: { $in: ACTIVE },
    });
    if (taken >= TABLES_PER_SLOT) {
      return { ok: false, error: "Sorry, this time slot has just been fully booked. Please choose another." };
    }

    // Unique reference toiri (duplicate hole abar try)
    for (let i = 0; i < 5; i++) {
      const reference = "BK-" + randomInt(100000, 1000000);
      try {
        await Reservation.create({ reference, name, email, phone, guests, date, time });
        revalidatePath("/admin/reservations");
        return { ok: true, reference };
      } catch (err) {
        if (err.code !== 11000) throw err;
      }
    }
    return { ok: false, error: "Could not create booking. Please try again." };
  } catch (err) {
    console.error("createReservation error:", err.message);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

/* ---------- Admin ---------- */

export async function getReservations() {
  try {
    await requireAdmin();
    await dbConnect();
    const docs = await Reservation.find({}).sort({ date: 1, time: 1 }).lean();
    return docs.map(serialize);
  } catch (err) {
    console.error("getReservations error:", err.message);
    return [];
  }
}

export async function updateReservationStatus(id, status) {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(id) || !STATUSES.includes(status))
      return { ok: false, error: "Invalid request." };

    await dbConnect();
    const updated = await Reservation.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return { ok: false, error: "Reservation not found." };

    revalidatePath("/admin/reservations");
    return { ok: true };
  } catch (err) {
    console.error("updateReservationStatus error:", err.message);
    return { ok: false, error: "Update failed." };
  }
}

export async function deleteReservation(id) {
  try {
    await requireAdmin();
    if (!mongoose.isValidObjectId(id)) return { ok: false, error: "Invalid id." };

    await dbConnect();
    const deleted = await Reservation.findByIdAndDelete(id);
    if (!deleted) return { ok: false, error: "Reservation not found." };

    revalidatePath("/admin/reservations");
    return { ok: true };
  } catch (err) {
    console.error("deleteReservation error:", err.message);
    return { ok: false, error: "Delete failed." };
  }
}