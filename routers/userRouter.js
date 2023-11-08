import { Router } from 'express';
import {
    getCurrentUser,
    getApplicationStats,
    loginUser,
    logoutUser,
    register,
    updateUser,
} from '../controllers/userController.js';
import {
    authorizePermissions,
    checkTestUser,
    loginValidate,
    registerValidate,
    validateUpdateUserInput,
} from '../middlewares/validatorMiddleware.js';
import { authenticateUser } from '../middlewares/authenticateMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = Router();
//auth
router.post('/register', registerValidate, register);
router.post('/login', loginValidate, loginUser);
router.get('/logout', logoutUser);
//user
router.get('/current-user', authenticateUser, getCurrentUser);
router.get('/admin/app-stats', authenticateUser, authorizePermissions('admin'), getApplicationStats);
router.patch(
    '/update-user',
    authenticateUser,
    checkTestUser,
    upload.single('avatar'),
    validateUpdateUserInput,
    updateUser,
);

export default router;
