const { validationResult } = require('express-validator');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const jtw = require('jsonwebtoken');


const userRegister = async (req, res) => {
    let { name, email, password } = req.body;
    console.log('---resquest body--- :', req.body);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let newUser = new User;
        let hashedPassword = await bcrypt.hash(password, 10);

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

const userLogin = async (req, res) => {
    let { email, password } = req.body;
    console.log('---Login Body request :',req.body);
    
    try {
        let user = await User.findOne({ email });
        console.log('user',user);
        
        if (!user) {
            res.status(400).json({
                message: 'user not found'
            })
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('is Match :',isMatch);
        
        if (!isMatch) {
            res.status(400).json({
                message: "password or email incorrect"
            })
            return;
        }

        let token = jtw.sign({ user_id: user._id }, "hicham@123",{expiresIn:"1d"});
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:1*24*60*60*1000

        });
        return res.status(200).json({
            message: "You loggedin successfully",
            token
        })



    } catch (error) {
        console.log(error);
    }
}


module.exports = { userRegister, userLogin };