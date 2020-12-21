import User from "../../models/User";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { SMTP_HOST, SMTP_PORT, AUTH } from '../../../config/emailConfig.json'
import { emailBody } from './utils'
import { JWT_SECRET, HOST, PORT } from '../../../config/default.json'
import nodemailer from 'nodemailer';
import Exception from '../../Exception'

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const errors = await validationResult(req)
        if (!errors.isEmpty()) {
            throw new Exception({
                error: 'Validation Error',
                data: errors.array()
            })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Exception({
                error: 'User not found',
            })
        }
        const token = await jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: 60 * 15 })
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

        await user.updateOne({ resetToken: token })
        res.json({ message: `email has been sent on email: ${user.email}` })
    } catch (e) {
        res.json({
            error: e.error,
            data: e?.data
        })
    }
}





