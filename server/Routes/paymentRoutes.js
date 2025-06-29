import express from 'express';
import { verifyKhaltiPayment, initiateKhaltiPayment } from '../controllers/paymentController.js';
import { authenticateUser } from '../middleware/authorizedUser.js';

const router = express.Router();

router.post('/initiate', authenticateUser, initiateKhaltiPayment);
router.post('/khalti-verify', authenticateUser, verifyKhaltiPayment);

export default router;