import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfilePicture,
    sendResetLink,
    resetPassword 
} from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authorizedUser.js';
import multerUpload from '../middleware/multerUpload.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);
router.put(
    '/profile/picture',
    authenticateUser,
    multerUpload.single('profilePicture'), 
    updateUserProfilePicture
);
router.post(
    "/forgot-password",
    sendResetLink
);
router.post(
    "/reset-password/:token",
    resetPassword
);

export default router;