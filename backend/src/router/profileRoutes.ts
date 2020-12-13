import { Router } from 'express';
import { user } from '../controllers/profile/index';
import session from "../middleware/checkSession"

const router = Router();

router.get('/profile/:id', session, user)


export { router }
