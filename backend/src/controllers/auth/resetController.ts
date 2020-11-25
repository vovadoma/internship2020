import User from "../../models/User";
import { Request, Response } from 'express';

//  coming soon...
const reset = async (req: Request, res: Response) => {
    const { email } = req.body
    const user = User.findOne({ email: email })
}
export default reset
