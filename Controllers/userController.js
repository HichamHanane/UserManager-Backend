const { validationResult } = require('express-validator');
const User = require('../Models/User');
const { hash } = require('bcrypt');




const userRegister = async (req, res) => {
    let { name, email, password } = req.body;
    console.log('---resquest body--- :', req.body);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let newUser = new User;
        let hashedPassword = await hash(password, 10);

        newUser.name = name;
        newUser.email = email;
        newUser.password = hashedPassword;

        console.log('----new user---- :', newUser);

        await newUser.save();

        res.json({
            message: "new user created!",
            data: newUser
        });
    } catch (error) {
        console.log("Error while creating a new user :", error);
        res.status(401).json({
            error: "error while creating a new user",
            message: error
        })
    }
}


module.exports = { userRegister };