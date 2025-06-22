import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import memberRoutes from "./routes/memberRoutes";
import cors from "cors";

dotenv.config();
 connectDB(); 

const app = express();

//middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(cors({
  origin: ["http://localhost:5173", "https://gym-tracker-app-frontend.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Gym backend is live!");
});

//  routes
app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
