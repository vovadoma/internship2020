import { check } from 'express-validator';

export const registrationValid = [
    check('formData.firstName', 'Field cannot be empty').notEmpty(),
    check('formData.lastName', 'Field cannot be empty').notEmpty(),
    check('formData.phone', 'Field cannot be empty').notEmpty().isNumeric().withMessage('Invalid phone number'),
    check('formData.email', 'Field cannot be empty').notEmpty().isEmail().withMessage('Invalid email address'),
    check('formData.password', 'Field cannot be empty').notEmpty().isLength({ min: 6 }).withMessage('The password has to be minimum 6 characters'),
    check('formData.repeatPassword', 'Field cannot be empty').notEmpty().custom(async (repeatPassword, { req }) => {
        const password = req.body.formData.password
        if (password !== repeatPassword) {
            throw new Error('Passwords must be same')
        }
    }),
]

export const loginValid = [
    check('email', 'Field cannot be empty').notEmpty().isEmail().withMessage('Invalid email address'),
    check('password', 'Field cannot be empty').notEmpty().isLength({ min: 6 }).withMessage('The password has to be minimum 6 characters'),
]

export const resetValid = [
    check('email', 'Field cannot be empty').notEmpty().isEmail().withMessage('Invalid email address'),
]
