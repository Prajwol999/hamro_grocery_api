import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config';
import userRouter from './Routes/userRouter.js';
import sellerRouter from './Routes/sellerRoutes.js';

const app = express();
const port = process.env.PORT || 8081;

(async () => {
  await connectDB();

  // Middleware setup
  const allowedOrigins = ['http://localhost:5173'];
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: allowedOrigins, credentials: true }));

  // Routes
  app.get('/', (req, res) => res.send("API is working"));
  app.use('/api/user',userRouter)
  app.use('/api/seller',sellerRouter)
  

  // Start server
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
})();
