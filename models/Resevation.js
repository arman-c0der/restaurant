import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true }, // BK-123456
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    guests: { type: Number, required: true, min: 1, max: 8 },
    date: { type: String, required: true }, // "YYYY-MM-DD" (string, jate timezone jhamela na hoy)
    time: { type: String, required: true }, // "19:00"
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

ReservationSchema.index({ date: 1, time: 1 });

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema, "reservations");