const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtToken");

const users = [
    {
        _id:1,
        fullName: "test1",
        email: "test1@gmail.com",
        password: "$2b$10$8yhdkeP46C2CAgFVlLTnfuTe.DmW67SWFThgiCngb7lPwO6fn.kN6"
    },
    {
        _id:2,
        fullName: "test2",
        email: "test2@gmail.com",
        password: "$2b$10$HIgMo3dwvDS7VIEhtBVSQeCkFLNFRQ2ygpSh8BSwPY.Oi1r52ZWIS"
    }
]

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = users.find((u) => u.email === email)
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
        const user = {
            fullName,
            email,
            password: hashesdPassword
        }
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

exports.getUsers = (req,res) => {
    res.status(200).json({
        success: true,
        users,
    })
}