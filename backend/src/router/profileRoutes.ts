import { Router } from 'express';
import { setting, profile, editProfile } from '../controllers/profile/';
import { editProfileValid } from "../middleware/checkValidForm";
import session from "../middleware/checkSession";
import upload from '../middleware/checkFile'
const router = Router();

// http://localhost:5000/api/profile/
router.get('/profile/:id', session, profile)

// http://localhost:5000/api/setting/
router.get('/setting/:id', session, setting)

// http://localhost:5000/api/editProfile/
router.put('/editprofile', upload, editProfileValid, session, editProfile)

export default router 
