import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/Users";
import Member from "./models/Member";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    await User.deleteMany();
    await Member.deleteMany();

    const hashedPassword = await bcrypt.hash("123", 10);

    const sampleUsers = [
      {
        name: "Ayaan",
        role: "superadmin",
        email: "ayaan@example.com",
        password: hashedPassword,
      },
      {
        name: "Fatima",
        role: "superadmin",
        email: "fatima@example.com",
        password: hashedPassword,
      },
      {
        name: "Khalid",
        role: "admin",
        email: "khalid@example.com",
        password: hashedPassword,
      },
    ];

    const sampleMembers = [
      {
        name: "Layla Abdi",
        phone: "0612345678",
        address: "Hargeisa, Somalia",
        StartedDate: new Date(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        gender: "female",
        paymentType: "monthly",
        paymentMethod: "zaad",
        Price: 25,
        Discount: 0,
      },
      {
        name: "Mohamed Ali",
        phone: "0623456789",
        address: "Hargeisa, Somalia",
        StartedDate: new Date(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        gender: "male",
        paymentType: "yearly",
        paymentMethod: "Edahab",
        Price: 25,
        Discount: 0,
      },
    ];

    await User.insertMany(sampleUsers);
    await Member.insertMany(sampleMembers);

    console.log("🌱 Data seeded for users and members!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    await User.deleteMany();
    await Member.deleteMany();

    console.log("🧹 All user and member data destroyed");
    process.exit();
  } catch (err) {
    console.error("❌ Destruction failed:", err);
    process.exit(1);
  }
};

if (process.argv[2] === "--destroy") {
  destroyData();
} else {
  seedDB();
}
