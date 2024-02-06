const express = require("express");
const app = express()
const cors = require('cors')
const mainRouter = require('./routes/index')


// middlewRES
app.use(cors())
app.use(express.json())
app.use('/api/v1', mainRouter)



app.listen(3000, ()=>{
    console.log("server is open at port 3000")
})