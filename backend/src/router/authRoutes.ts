import { Router } from 'express';
import { login, registration, reset } from '../controllers/auth/index';
import { registrationValid, loginValid, resetValid } from "../middleware/checkValidForm"
const router = Router();


// http://localhost:5000/api/registration
router.post('/registration', registrationValid, registration)

// http://localhost:5000/api/login
router.post('/login', loginValid, login)

// http://localhost:5000/api/reset
router.post('/reset', resetValid, reset)

export { router }
