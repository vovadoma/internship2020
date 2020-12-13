import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/default.json'

export default async (req: Request & { user?: object }, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({ error: 'Forbidden' });
        return;
    }
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        if (err) {
            res.status(401).json({ error: 'Auth error' });
            return;
        }
        req.user = decodedData;
        next()
    })
}


