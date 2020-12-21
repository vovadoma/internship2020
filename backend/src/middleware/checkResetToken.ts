import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/default.json'
import User from "../models/User";

export default async (req: Request & { user?: object }, res: Response, next: NextFunction) => {
    const { token } = req.params;
    if (!token) {
        res.status(403).json({ error: 'Token not found' });
        return;
    }
    const user = await User.findOne({ resetToken: token })
    if (user) {
        jwt.verify(token, JWT_SECRET, (err, decodedData) => {
            if (err) {
                res.status(401).json({ error: 'Token error' });
                return;
            }
            req.user = decodedData;
            next()
        })
    } else {
        res.json({ error: 'Token Expire' })
    }

}