const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://shahzad:AyAtdxCvDLYPESyd@cluster0.ijtu76f.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    firstName:{
        type: String,
    },
    lastName:{
        type:String,
    },
})


const User = mongoose.model('User', userSchema)

module.exports = {
    User
}