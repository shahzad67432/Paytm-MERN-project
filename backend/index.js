const express = require("express");
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = "123321123"

app.use(cors)
app.use(express.json())
import User from './db/data'

app.post('/signup', secretKey, async (res, req)=>{
    const {Username, Password, firstName, lastName} = req.body
    const response = User.find({Username})
    const token = jwt.token({Username}, secretKey)
    if(response.ok){
        res.status(401).json({
            msg:"user already exists with this credentials"
        })
    }
    try{
        const hashedPassword = await bcrypt.hash(Password, 5)
    }catch(error){
        console.error("cannot hased the password")
    }
    User.add({Username, hashedPassword, firstName, lastName})
    res.status(200).json({msg:"user created successfully"})
})
app.post('/signin', (res, req)=>{
    const {Username, Password} = req.body
    const userExists = User.find({Username})
    if(!userExists.ok){
        res.status(401).json({msg:"user not exists"})
    }
    try{
        const response = bcrypt.compare(hashedPassword, Password)
        if(response.ok){
            res.json({msg:"user created successfully"})
        }
    }
    catch(error){
        console.error("wrong password/is incorrect")
    }
})
app.put('/updateInfo', (res, req)=>{

})

app.listen(3000, ()=>{
    console.log("server is open at port 3000")
})