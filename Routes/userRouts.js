const express = require('express');
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const verifyToken  = require('../Middleware/verifyToken');
const { getUsers ,deleteUser} = require('../Controllers/userController');

router.get('/users',getUsers)
router.delete('/users/:id',deleteUser)




module.exports = router;