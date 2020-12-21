import { Request, Response } from 'express';
import User from '../../models/User'
import Exception from '../../Exception'

const profile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            throw new Exception({
                error: 'Error link'
            })
        }
        const user = await User.findOne({ _id: id })
        if (!user) {
            throw new Exception({
                error: 'Profile not found'
            })
        }

        res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            avatar: user.avatar,
            id: user._id,
        })

    } catch (e) {
        res.json({
            error: e.error,
            data: e?.data
        })
    }
}
export default profile

