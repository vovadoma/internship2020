import { Request, Response } from 'express';
import User from '../../models/User'

const profile = async (req: Request & { user?: object }, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            res.json({ error: 'Profile not found' })
        } else {
            const user = await User.findOne({ _id: id })
            if (!user) {
                res.json({ error: 'Profile not found' })
            } else {
                res.json({ email: user.email, firstName: user.firstName, lastName: user.lastName, id: user._id, })
            }
        }
    } catch (e) {
        res.json({ error: e.message })
    }
}
export default profile

