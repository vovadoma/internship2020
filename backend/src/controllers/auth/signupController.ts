import User from "../../models/User";
import { Request, Response } from 'express';
import { hashPass } from './utils'
import { validationResult } from 'express-validator'

const registration = async (req: Request, res: Response) => {
    try {
        const { formData } = req.body;
        const errors = await validationResult(req)
        if (!errors.isEmpty()) {
            res.json({
                errors: errors.array(),
                error: 'Invalid registrations data'
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
                    await User.create({ ...formData, password: hashPassword })
                    return res.json({ logged: true })
                }
            }
        }
    }
    catch (e) {
        res.json({ error: e.message })
    }
}
export default registration
