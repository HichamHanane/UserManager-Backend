const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { userRegister } = require('../Controllers/userController');

const validateUserInputs = [
    body('name').isString().withMessage('name must be a string '),
    body('email').isEmail().withMessage('email must be a valide email'),
    body('password').isLength({ min: 8 }).withMessage('password must be at least 6 characters'),
]

router.post('/register', validateUserInputs,userRegister);


module.exports = router;