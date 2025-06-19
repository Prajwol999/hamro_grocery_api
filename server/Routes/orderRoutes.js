import express from 'express';
import { getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authenticateUser, isAdmin } from '../middleware/authorizedUser.js';

const router = express.Router();

router.get('/', authenticateUser, isAdmin, getOrders);
router.put('/:id', authenticateUser, isAdmin, updateOrderStatus);

export default router;