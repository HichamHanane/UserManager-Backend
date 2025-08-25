const { validationResult } = require('express-validator');




const userRegister = (req, res) => {
    let useData = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({
        message: "created!",
        data: useData
    });
}

module.exports = {userRegister};