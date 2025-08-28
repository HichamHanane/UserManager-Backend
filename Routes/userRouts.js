const express = require('express');
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const verifyToken  = require('../Middleware/verifyToken');
const { getUsers ,deleteUser} = require('../Controllers/userController');
const verifyRole = require('../Middleware/verifyRole');

router.get('/users',verifyToken,verifyRole,getUsers)
router.delete('/users/:id',verifyToken,verifyRole,deleteUser)




module.exports = router;