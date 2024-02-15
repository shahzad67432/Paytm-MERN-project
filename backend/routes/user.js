const express = require('express')


const {User} = require('../db/data.js')
const {balance} = require('../db/data.js')
const z = require("zod")
const userRouter = express.Router()
const { JWT_Key } =require('../config')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const {authMiddleware} = require('../middlewares/AuthMiddleware.js')

userRouter.use(express.json())

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName:  z.string()
})

userRouter.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await balance.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({
        userId
    }, JWT_Key);

    res.json({
        message: "User created successfully",
        token: token
    })
})



userRouter.post('/signin', async function(req, res){
    const username  = req.body.username
    const password = req.body.password

    const existingUser = await User.findOne({username:username})
    if(!existingUser){
        res.status(401).json({
            msg:'user not exists'
        })
    }
    const token = jwt.sign({username:username}, "JWT_key")
    res.json({
        token,
        msg:"user signed successfully"
    })
})

const updateUser = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
})

userRouter.put('/update', authMiddleware, async (req, res)=>{
    const {success} = updateUser.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await   User.updateOne(req.body, {
        _id: req.userId,
    })
    res.json({
        message: "Updated successfully"
    })
})
userRouter.get('/bulk', async (req, res)=>{
    const filter = req.query.filter || "" // the empty "" means that if user not inputs anything gives them the all users.
    const users = await User.find({
        $or: [
            {'lastName':{"$regex":filter}},     // will check that if even user input 'sha' part of the name shahzad it will search and givees back shahzad.
            {'firstName':{"$regex":filter}},
            {'username':{"$regex":filter}}

        ]
    })
    res.json({
        user: users.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }))
    })
})

module.exports = userRouter
