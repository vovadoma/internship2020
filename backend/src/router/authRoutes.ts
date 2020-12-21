import { Router } from 'express';
import { login, registration, forgotPassword, resetPassword, getResetPassword, user } from '../controllers/auth/';
import { registrationValid, loginValid, forgotValid, resetValid } from "../middleware/checkValidForm";
import session from "../middleware/checkSession";
import checkReset from "../middleware/checkResetToken";
const router = Router();

// http://localhost:5000/api/registration
router.post('/registration', registrationValid, registration)

// http://localhost:5000/api/login
router.post('/login', loginValid, login)

// http://localhost:5000/api/forgot
router.put('/forgot', forgotValid, forgotPassword)

// http://localhost:5000/api/reset
router.put('/reset', resetValid, resetPassword)

// http://localhost:5000/api/reset/
router.get('/reset/:token', checkReset, getResetPassword)

// http://localhost:5000/api/user
router.get('/user/', session, user)






export default router 
