const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { userRegister, userLogin,getProfile,checkAuth,logout} = require('../Controllers/AuthController');
const verifyToken  = require('../Middleware/verifyToken');

const validateUserInputs = [
    body('name').isString().withMessage('name must be a string '),
    body('email').isEmail().withMessage('email must be a valide email'),
    body('password').isString().withMessage('password must be a string ').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
]

router.post('/register', validateUserInputs,userRegister);

router.post('/login',userLogin)

router.post('/logout',logout)

router.get('/profile',verifyToken,getProfile)

router.get('/check-token',verifyToken,checkAuth); 


module.exports = router;