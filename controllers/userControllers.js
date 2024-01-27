const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtToken");
const userModel = require("../models/userModel");


exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user =await userModel.findOne({email})

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                isAuthenticated: false
            })
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                isAuthenticated: false
            })
        }
        req.user = user
        generateToken(req,res)
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "user not found",
            isAuthenticated: false
        })
    }
};

exports.register = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        const hashesdPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            fullName,
            email,
            password:hashesdPassword
        })
        res.status(200).json({
            success: true,
            message: "User Registered",
            isAuthenticated: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "user not registered",
            isAuthenticated: false
        })
    }

}

exports.getUsers = async(req,res) => {

    const users = await userModel.find()

    res.status(200).json({
        success: true,
        users,
    })
}