import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signJWT = (payload: string | object | Buffer, secret: string | undefined): Promise<string | undefined> => new Promise((res, rej) => {
    jwt.sign(payload, 'interShip', (err, data) => {
        if (err) {
            rej(err);
            return;
        }
        res(data);
    })                                                                                           
})

export const hashPass = (password: string, salt: number): Promise<string> => new Promise((res, rej) => {                                
    bcrypt.hash(password, salt, (err, data) => {
        if (err) {
            rej(err);
            return;
        }
        res(data);
    })
})
