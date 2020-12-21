import { Request, Response } from 'express';
import { JWT_SECRET } from '../../../config/default.json'
import { signJWT } from './utils'
import { validationResult } from 'express-validator'
import User from '../../models/User'
import Exception from '../../Exception'

const editProfile = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const currentUser = req.user
        const errors = await validationResult(req)

        if (!errors.isEmpty()) {
            throw new Exception({
                error: 'Validation Error',
                data: errors.array()
            })
        }

        if (!currentUser) {
            throw new Exception({
                error: 'not authorized'
            })
        }

        const { email, firstName, lastName, phone, timeZone } = req.body

        const userWithSameEmail = await User.findOne({ email })
        if (userWithSameEmail && userWithSameEmail._id.toString() !== currentUser.id) {
            throw new Exception({
                error: 'Email already exists'
            })
        }

        const user = await User.findOne({ _id: currentUser.id })
        if (!user) {
            throw new Exception({
                error: 'User not found'
            })
        }

        let avatar: string = req.file?.filename || user.avatar
        await user.updateOne({ email, firstName, lastName, phone, timeZone, avatar })
        const token = await signJWT({
            email,
            firstName,
            lastName,
            avatar,
            phone,
            id: currentUser.id
        }, JWT_SECRET);

        res.json({ token });

    } catch (e) {
        res.json({
            error: e.error,
            data: e?.data
        })
    }
}
export default editProfile

