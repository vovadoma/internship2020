import User from "../../models/User";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { hashPass } from "../utils";
import Exception from "../../Exception";

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { userId, password } = req.body;
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            throw new Exception({
                error: "Validation Error",
                data: errors.array(),
            });
        }
        if (!userId) {
            throw new Exception({
                error: "Incorect Id",
            });
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Exception({
                error: "User not found",
            });
        }
        const hashPassword = await hashPass(password, 10);
        await user.updateOne({ password: hashPassword, resetToken: "" });
        res.json({ message: "Password update" });
    } catch (e) {
        res.json({
            error: e.error,
            data: e?.data,
        });
    }
};

export const getResetPassword = async (
    req: Request & { user?: object },
    res: Response
) => {
    try {
        const userId = req.user;
        if (!userId) {
            throw new Exception({
                error: "User not found",
            });
        }
        res.json({ userId });
    } catch (e) {
        res.json({ error: e.error });
    }
};
