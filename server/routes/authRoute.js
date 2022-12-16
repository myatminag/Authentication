import { Router } from 'express';

import { forgotPassword, Login, resetPassword, Signup } from '../controllers/authControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

/** Signup */
router.post('/signup', Signup);

/** Login */
router.post('/login', Login);

/** Forgot Password */
router.post('/forgotpassword', forgotPassword);

/** Reset Password */
router.put('/resetpassword/:resetToken', resetPassword);

export default router;