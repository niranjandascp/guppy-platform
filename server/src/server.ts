import dotenv from "dotenv";
dotenv.config();

import app from "./app.ts";
import connectDB from "./config/db.ts";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`💻Server running on Port http://localhost:${PORT}`);
  });
};

startServer();