import { Request, Response } from 'express';
import Exception from '../../Exception'

const setting = async (req: Request & { user?: { email: string, firstName: string, lastName: string, phone: string, avatar: string, id: string } }, res: Response) => {
    try {
        const params = req.params
        const user = req.user

        if (!params.id) {
            throw new Exception({
                error: 'Error link'
            })
        }

        if (!user) {
            throw new Exception({
                error: 'Wrong user'
            })
        }

        if (params.id !== user.id) {
            throw new Exception({
                error: 'Wrong user'
            })
        }
        res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            avatar: user.avatar
        })

    } catch (e) {
        res.json({
            error: e.error,
            data: e?.data
        })
    }
}
export default setting

