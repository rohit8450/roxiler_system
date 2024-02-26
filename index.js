import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import appRouter from './routes/appRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 8000;

dotenv.config();
const app = express();

// Middleware
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/app", appRouter);

// Default route for serving HTML
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Connect to MongoDB and start the server
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    console.log('Connected to the database');
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
