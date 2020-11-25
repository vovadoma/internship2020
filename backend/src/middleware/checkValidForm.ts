import { check, validationResult } from 'express-validator';
import { Request, Response } from 'express';


export const registrationValid = [
    check('formData.firstName', 'Field cannot be empty').notEmpty(),
    check('formData.lastName', 'Field cannot be empty').notEmpty(),
    check('formData.phone', 'Field cannot be empty').notEmpty(),
    check('formData.email', 'Incorrect email').notEmpty().isEmail(),
    check('formData.password', 'Field cannot be empty').notEmpty().isString(),
    check('formData.repeatPassword', 'Field cannot be empty.').notEmpty().isString()
]

export const loginValid = [
    check('email', 'Incorrect email').notEmpty().isEmail(),
    check('password', 'min password length').notEmpty().isString(),
]

export const resetValid = [
    check('email', 'Incorrect email').notEmpty().isEmail(),
]
