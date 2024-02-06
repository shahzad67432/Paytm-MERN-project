const express = require('express')

const {User} = require('../db/data.js')
const z = require("zod")
const userRouter = express.Router()
const { JWT_Key } =require('../config')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

userRouter.use(express.json())

const validation = z.object({
    username: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName:  z.string()
})

userRouter.post('/signup', async (req, res)=>{
    const {username, password, firstName, lastName} = req.body
    const {success} = validation.safeParse(req.body)
    if(!success){
        return res.json({
            msg:"wrong inputs"
        })
    }

    const existingUser = await User.findOne({username})
    if(existingUser){
        res.status(411).json({
            msg:"user already exists with this credentials"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 5)
    const user = User.create({
        username:username,
        password: hashedPassword,
        firstName:firstName,
        lastName:lastName,
    })
    const User_id = user._id
    const token = jwt.sign({User_id}, JWT_Key)
    res.status(200).json(
        {  
            msg:"user created successfully", 
            token
        }
    )
    
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
    const passwordMatch = await bcrypt.compare(password, existingUser.password)
    if(!passwordMatch){
        res.status(402).json({
            msg:"password is not correct"
        })
    }
    const token = jwt.sign({username:username}, "JWT_key")
    res.json({
        token,
    })
})

module.exports = userRouter
