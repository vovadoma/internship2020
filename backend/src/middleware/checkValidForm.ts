import { check } from 'express-validator';

export const registrationValid = [
    check('formData.firstName', 'Fist name cannot be empty').notEmpty(),
    check('formData.lastName', 'Last name cannot be empty').notEmpty(),
    check('formData.phone', 'Phone cannot be empty').notEmpty().isNumeric().withMessage('Invalid phone number'),
    check('formData.email', 'Email cannot be empty').notEmpty().isEmail().withMessage('Invalid email address'),
    check('formData.password', 'Password cannot be empty').notEmpty().isLength({ min: 6 }).withMessage('The password has to be minimum 6 characters'),
    check('formData.repeatPassword', 'Repeat password cannot be empty').notEmpty().custom(async (repeatPassword, { req }) => {
        const password = req.body.formData.password
        if (password !== repeatPassword) {
            throw new Error('Passwords must be same')
        }
    }),
]

export const loginValid = [
    check('email', 'Eail cannot be empty').notEmpty().isEmail().withMessage('Invalid email address'),
    check('password', 'Password cannot be empty').notEmpty().isLength({ min: 6 }).withMessage('The password has to be minimum 6 characters'),
]

export const forgotValid = [
    check('email', 'Email cannot be empty').notEmpty().isEmail().withMessage('Invalid email address'),
]

export const resetValid = [
    check('password', 'Password cannot be empty').notEmpty().isLength({ min: 6 }).withMessage('The password has to be minimum 6 characters'),
    check('repeatPassword', 'Repeat password cannot be empty').notEmpty().custom(async (repeatPassword, { req }) => {
        const password = req.body.password
        if (password !== repeatPassword) {
            throw new Error('Passwords must be same')
        }
    }),
]

export const editProfileValid = [
    check('firstName', 'First name cannot be empty').notEmpty(),
    check('lastName', 'Last name cannot be empty').notEmpty(),
    check('phone', 'Phone cannot be empty').notEmpty().isNumeric().withMessage('Invalid phone number'),
    check('email', 'Email cannot be empty').notEmpty().isEmail().withMessage('Invalid email address'),
]