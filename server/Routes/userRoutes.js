
import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfilePicture } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authorizedUser.js';
import fileUpload from '../middleware/fileUpload.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);
router.put(
    '/profile/picture',
    authenticateUser,
    fileUpload.single('profilePicture'), 
    updateUserProfilePicture
);

export default router;