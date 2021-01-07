import User from "../../models/User";
import { signJWT } from "../utils";
import { Request, Response } from "express";
import { JWT_SECRET } from "../../../config/default.json";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import Exception from "../../Exception";

const login = async (req: Request & { user?: object }, res: Response) => {
    try {
        const { email, password } = req.body;
        const errors = await validationResult(req);

        if (!errors.isEmpty()) {
            throw new Exception({
                error: "Validation Error",
                data: errors.array(),
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Exception({
                error: "Wrong password/email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Exception({
                error: "Wrong password/email",
            });
        }

        const token = await signJWT(
            {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                phone: user.phone,
                id: user._id,
            },
            JWT_SECRET
        );

        res.json({ token });
    } catch (e) {
        res.json({
            error: e.error,
            data: e?.data,
        });
    }
};

export default login;
