import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Routes import
import productRoutes from "./routes/productRoutes.ts";
import orderRoutes from "./routes/orderRoutes.ts";

dotenv.config();

const app: Application = express();

// Security
app.use(helmet());

// Logger
app.use(morgan("dev"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://127.0.0.1:5000",
    credentials: true,
  })
);

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Guppy Platform API is running 🐟" });
});

export default app;