import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from './routes/admin/adminUserRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();
connectDB();

const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the hamrogrocery-backend API!");
});


app.use(errorHandler);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});