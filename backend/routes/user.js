const express = require('express')

const z = require("zod")
const userRouter = express.Router()
import { JWT_Key } from '../config'

const validation = z.object({
    Username: z.string().email(),
    Password: z.string().Password().min(8),
})

userRouter.post('/signup', JWT_Key, async (res, req)=>{
    const {Username, Password, firstName, lastName} = req.body
    const response = User.find({Username})
    if(response.ok){
        res.status(411).json({
            msg:"user already exists with this credentials"
        })
    }
    const validSchema = validation.safeParse({Username, Password})
    const hashedPassword = await bcrypt.hash(Password, 5)
    if(validSchema){
        try{
            const token = jwt.sign({Username}, 'JWT_Key')
            User.add({Username, hashedPassword, firstName, lastName})
            res.status(200).json(
                {  
                    msg:"user created successfully", 
                    token
                }
            )
        }catch(error){
            console.error("token not genrated")
        }
    }
    else{
        console.log(" wrong inputs for username and password ")
    }
})


userRouter.post('/signin', (res, req)=>{
    const {Username, Password} = req.body;
    const userExists = User.find({Username})
    if(!userExists.ok){
        res.status(411).json({msg:"user not exists/email is incorrect"})
    }
    const validToken = jwt.verify(token, 'JWT_key', (err, decoded)=>{
        if(err){
            res.status(411).json({msg:"invalid token"})
        }else{
            req.user = decoded
        }
    })
    try{
        const response = bcrypt.compare(hashedPassword, Password) && validToken
        if(response.ok){
            res.json({msg:"user created successfully"})
        }
    }
    catch(error){
        console.error("wrong password/is incorrect")
    }
})



module.exports = userRouter
