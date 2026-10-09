import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);

    const email = "arman.arfat24@gmail.com";
    const password = "arman@123";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed Password:", hashedPassword);

    await User.create({
      name: "Restaurant Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

   
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();