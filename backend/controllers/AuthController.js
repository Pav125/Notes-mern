const User = require('../models/AuthModel')
const bcrypt = require('bcryptjs')
const { createSecretToken } = require('../util/secretToken')

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, username, password, createdAt } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please enter all fields" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = await User.create({ email, username, password, createdAt })
        const token = createSecretToken(user._id)

        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
            secure: true,
            sameSite: 'None',
            domain: 'https://mymemo.vercel.app'
        })

        res
            .status(201)
            .json({ message: 'Account created successfully', state: true, user })

        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
}

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const authUser = await bcrypt.compare(password, user.password)

        if (!authUser) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = createSecretToken(user._id)

        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
            secure: true,
            sameSite: 'None',
            domain: 'https://mymemo.vercel.app'
        })

        res.status(200).json({ message: "Yay! logged in successfully", state: true, user })
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
}

// module.exports.Logout = async (req, res, next) => {
//     try {
//         res.clearCookie('token')
//         res.status(200).json({ message: "User logged out successfully", state: false })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({message: error.message})
//     }
// }