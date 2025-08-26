const { validationResult } = require('express-validator');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const jtw = require('jsonwebtoken');


const userRegister = async (req, res) => {
    let { name, email, password, role } = req.body;
    console.log('---resquest body--- :', req.body);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = await User.findOne({ email });

        console.log('user email found', user);


        if (user) {
            return res.status(400).json({
                message: "email already exist"
            })
        }

        let newUser = new User;
        let hashedPassword = await bcrypt.hash(password, 10);

        newUser.name = name;
        newUser.email = email;
        newUser.role = role;
        newUser.password = hashedPassword;

        console.log('----new user---- :', newUser);

        await newUser.save();

        res.json({
            message: "new user created!",
            data: newUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.', error: error.message });
    }
}

const userLogin = async (req, res) => {
    let { email, password } = req.body;
    console.log('---Login Body request :', req.body);

    try {
        let user = await User.findOne({ email });
        console.log('user', user);

        if (!user) {
            res.status(400).json({
                message: 'user not found'
            })
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('is Match :', isMatch);

        if (!isMatch) {
            res.status(400).json({
                message: "password or email incorrect"
            })
            return;
        }

        let token = jtw.sign({ user_id: user._id }, "hicham@123", { expiresIn: "1d" });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 1 * 24 * 60 * 60 * 1000

        });
        return res.status(200).json({
            message: "You loggedin successfully",
            role: user.role,
            // token
        })



    } catch (error) {
        console.log(error);
    }
}

const getProfile = async (req, res) => {
    try {
        return res.status(200).json({
            message: "welcom to your dashboard",
            user: req.user
        })
    } catch (error) {
        console.log('error in dashboard endpoint:', error);
        res.status(500).json({
            error
        })
    }
}

const checkAuth = (req, res) => {
    try {
        res.status(200).json({
            message: "valide Token found",
            user: req.user,
        })
    } catch (error) {
        console.log('error server:', error);

    }
}

const logout = async (req, res) => {
    try {
        
        res.clearCookie('token');

        return res.status(200).json({
            message: "you logged out"
        });
    } catch (error) {
        
        console.error('Erreur lors de la déconnexion :', error);
        return res.status(500).json({
            error: error.message
        });
    }
}



module.exports = { userRegister, userLogin, getProfile, checkAuth, logout };