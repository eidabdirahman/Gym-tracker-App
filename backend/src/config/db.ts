import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(chalk.green(`✅ MongoDB connected`));
  } catch (error) {
    console.error(chalk.red("❌ MongoDB connection failed:", error));
    process.exit(1);
  }
};
