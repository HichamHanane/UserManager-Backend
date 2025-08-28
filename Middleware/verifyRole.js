


const verifyRole = (req, res, next) => {
    try {
        let user = req.user;
        if (user.role != "admin") {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        next();  

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

module.exports = verifyRole