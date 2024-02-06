const express = require("express");
const app = express()
const cors = require('cors')
import mainRouter from './routes/index'
import User from './db/data'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_Key = require('./config')

// middlewRES
app.use(cors())
app.use(express.json())
app.use('/api/v1', mainRouter)



app.listen(3000, ()=>{
    console.log("server is open at port 3000")
})