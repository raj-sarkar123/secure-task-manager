const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name must not be empty'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
    ],
    validateRequest,
    registerUser
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').notEmpty().withMessage('Password must not be empty')
    ],
    validateRequest,
    loginUser
);

module.exports = router;
