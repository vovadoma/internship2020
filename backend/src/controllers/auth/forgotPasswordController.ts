import User from "../../models/User";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { SMTP_HOST, SMTP_PORT, AUTH } from '../../../config/emailConfig.json'
import { emailBody, hashPass } from './utils'
import { JWT_SECRET, HOST, PORT } from '../../../config/default.json'
import nodemailer from 'nodemailer';

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const errors = await validationResult(req)
        if (!errors.isEmpty()) {
            res.json({
                errors: errors.array(),
            })
        }
        else {
            const user = await User.findOne({ email: email })
            if (!user) {
                res.json({ error: 'User not found' })
            } else {
                const token = await jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: 60 * 5 })
                // setTimeout(async () => await user.updateOne({ resetToken: '' }), 1000 * 60 * 5)
                const transporter = nodemailer.createTransport({
                    host: SMTP_HOST,
                    port: SMTP_PORT,
                    auth: {
                        user: AUTH.LOGIN,
                        pass: AUTH.PASS
                    }
                });

                await transporter.sendMail({
                    from: 'intership@gmail.com',
                    to: email,
                    subject: "Reset Password",
                    text: `follow the link to reset your password: http://${HOST}:${PORT}/reset${token}/`,
                    html: emailBody(HOST, 8080, token, user),
                });

                await user.updateOne({ resetToken: token }, (err, succes) => {
                    if (err) {  
                        res.json({ error: 'resset password error' })
                    } else {
                        res.json({ message: `email has been sent on email: ${user.email}` })
                    }

                })
            }
        }
    } catch (e) { res.json({ error: e.message }) }

}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { userId, password } = req.body
        const errors = await validationResult(req)
        if (!errors.isEmpty()) {
            res.json({
                errors: errors.array(),
            })
        }
        else {
            if (!userId) {
                res.json({ error: 'Incorect Id' })
            }
            else {
                const user = await User.findOne({ _id: userId })
                if (user) {
                    const hashPassword = await hashPass(password, 10)
                    await user.updateOne({ password: hashPassword })
                    await user.updateOne({ resetToken: '' })

                    res.json({ message: 'Password update' })
                } else {
                    res.json({ error: 'User not found' })
                }
            }
        }
    } catch (e) { res.json({ error: e.message }) }
}


export const getResetPassword = async (req: Request & { user?: object }, res: Response) => {
    try {
        const userId = req.user
        if (!userId) {
            res.json({ error: 'User not found' })
        } else {
            res.json({ userId })
        }
    } catch (e) {
        res.json({ error: e.message })
    }
}



