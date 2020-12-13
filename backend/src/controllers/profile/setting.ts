import { Request, Response } from 'express';

const setting = async (req: Request & { user?: object }, res: Response) => {
    try {
        const user = req.user
        if (!user) {
            res.json({ error: 'User not found' })
        } else {
            res.json({ user })
        }

    } catch (e) {
        res.json({ error: e.message })
    }
}
export default setting

