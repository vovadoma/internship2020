import User from "../../models/User";
import { signJWT } from './utils'
import { Request, Response } from 'express';
import { JWT_SECRET } from '../../../config/default.json'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

const login = async (req: Request & { user?: object }, res: Response) => {
    try {
        const { email, password } = req.body;
        const errors = await validationResult(req)
        if (!errors.isEmpty()) {
            res.json({
                errors: errors.array(),
            })
        }
        else {
            const user = await User.findOne({ email })
            if (!user) {
                res.json({ error: 'Wrong password/email' })
            }
            else {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    res.json({ error: 'Wrong password/email' })
                }
                else {
                    const token = await signJWT({ email: user.email, firstName: user.firstName, lastName: user.lastName, id: user._id, password: undefined }, JWT_SECRET)
                    res.json({ token })
                }
            }
        }
    } catch (e) { res.json({ error: e.message }) }
}

export default login
