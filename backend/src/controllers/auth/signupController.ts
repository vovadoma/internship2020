import User from "../../models/User";
import { Request, Response } from 'express';
import { hashPass, signJWT } from './utils'
import { validationResult } from 'express-validator'
import { JWT_SECRET } from '../../../config/default.json'
import Exception from '../../Exception'

const registration = async (req: Request, res: Response) => {
    try {
        const { formData } = req.body;
        if (!formData) {
            throw new Exception({
                error: 'Invalid Data'
            })
        }

        const errors = await validationResult(req)
        if (!errors.isEmpty()) {
            throw new Exception({
                error: 'Validation Error',
                data: errors.array()
            })
        }
        
        const hashPassword = await hashPass(formData.password, 10)
        const prevUser = await User.findOne({ email: formData.email })
        if (prevUser) {
            throw new Exception({
                error: 'User already exists'
            })
        }

        const user = await User.create({ ...formData, password: hashPassword })
        const token = await signJWT({ email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar, phone: user.phone, id: user._id }, JWT_SECRET)
        res.json({ token })
    }

    catch (e) {
        res.json({
            error: e.error,
            data: e?.data
        })
    }
}
export default registration
