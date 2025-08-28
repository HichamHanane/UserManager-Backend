const User = require("../Models/User")



const getUsers = async (req, res) => {
    try {
        let users = await User.find();

        return res.status(200).json({
            users
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    console.log('delete params', req.params.id);
    try {
        let id = req.params.id
        await User.findByIdAndDelete(id)
        let users = await User.find();
        res.json({
            message: 'user deleted ',
            users
        })
    } catch (error) {
        console.log(error);

    }
}

const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'Email already exist'
            })
        }
        let newUser = new User;

        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.role = role;
        await newUser.save();
        
        return res.status(200).json({
            message: "new user created successfully",
            newUser
        })
    } catch (error) {
        console.log('create new user error :', error);
        return res.status(500).json({
            message: 'server error',
            error
        })

    }
}

module.exports = { getUsers, deleteUser, addUser }