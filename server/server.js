import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // This works now after fixing userRoutes.js

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);

// Root route for testing
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the hamrogrocery-backend API!");
});

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});