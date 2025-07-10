// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { connectDB } from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import adminUserRoutes from './routes/admin/adminUserRoutes.js';
// import categoryRoutes from './routes/categoryRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import dashboardRoutes from './routes/dashboardRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import errorHandler from './middleware/errorHandler.js';

// dotenv.config();
// const app = express();
// connectDB();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const corsOptions = {
//   origin: "*", 
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   allowedHeaders: "Content-Type, Authorization",
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use("/api/auth", userRoutes);
// app.use('/api/admin/users', adminUserRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/payment', paymentRoutes);

// app.get("/", (req, res) => {
//     res.status(200).send("Welcome to the hamrogrocery-backend API!");
// });

// app.use(errorHandler);

// // Corrected Code
// const PORT = process.env.PORT || 8081;

// app.listen(PORT,  () => {
//     console.log(`Server running and listening on all interfaces at port ${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config(); // Must be at the very top

// --- DEBUGGING LOGS: Check your terminal for this output on server start ---
console.log("--- Loading Environment Variables ---");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "NOT LOADED");
console.log("-----------------------------------");


import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from './routes/admin/adminUserRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/auth", userRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/payment', paymentRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the hamrogrocery-backend API!");
});

app.use(errorHandler);

const PORT = process.env.PORT || 8081;

app.listen(PORT,  () => {
    console.log(`Server running and listening on all interfaces at port ${PORT}`);
});