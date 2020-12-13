import User from "../../models/User";
import { Request, Response } from 'express';
import { hashPass, signJWT } from './utils'
import { validationResult } from 'express-validator'
import { JWT_SECRET } from '../../../config/default.json'



const registration = async (req: Request, res: Response) => {
    try {
        const { formData } = req.body;
        if (formData) {
            const errors = await validationResult(req)
            if (!errors.isEmpty()) {
                res.json({
                    errors: errors.array(),
                })
            }
            else {
                if (formData.password !== formData.repeatPassword) {
                    return res.json({ error: 'Passwords do not match' })
                }
                else {
                    const hashPassword = await hashPass(formData.password, 10)
                    const prevUser = await User.findOne({ email: formData.email })
                    if (prevUser) {
                        res.json({ error: 'User already exists' })
                    }
                    else {
                        const user = await User.create({ ...formData, password: hashPassword })
                        const token = await signJWT({ ...user, password: undefined }, JWT_SECRET)
                        res.json({ token })
                    }
                }
            }
        } else {
            res.json({ error: 'Invalid Data' })
        }
    }

    catch (e) { res.json({ error: e.message }) }
}
export default registration
