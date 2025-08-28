const User = require("../Models/User")



const getUsers = async (req,res)=>{
    try {
        let users = await User.find();

        return res.status(200).json({
            users
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

const deleteUser = async(req,res)=>{
    console.log('delete params',req.params.id);
    try {
        let id = req.params.id
        await User.findByIdAndDelete(id)
        let users = await User.find();
        res.json({
            message:'user deleted ',
            users
        })
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {getUsers,deleteUser}