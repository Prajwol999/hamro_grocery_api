
import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfilePicture } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authorizedUser.js';
import multerUpload from '../middleware/multerUpload.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);
router.put(
    '/profile/picture',
    authenticateUser,
    multerUpload.single('profilePicture'), // Field name must be 'profilePicture'
    updateUserProfilePicture
);

export default router;