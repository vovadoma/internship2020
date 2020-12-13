import { Request, Response } from 'express';

const user = async (req: Request & { user?: object }, res: Response) => {
    const user = req.user
    try {
        res.json({ user })
    } catch (e) {
        res.json({ error: e.message })
    }
}
export default user

