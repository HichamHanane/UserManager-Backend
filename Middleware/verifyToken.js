const User = require('../Models/User');

const jtw = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Session expired , please login"
            })
        }
        await jtw.verify(token, 'hicham@123', async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token"
                })
            }
            let user = await User.findOne({ _id: decoded.user_id })
            req.user = user;
            next();
            // return res.status(200).json({
            //     message: "Authenticated",
            //     user
            // })
        })
    } catch (error) {
        console.log('error while cheking the token :', error);
        res.status(500).json({
            error
        })
    }

}

module.exports = verifyToken;