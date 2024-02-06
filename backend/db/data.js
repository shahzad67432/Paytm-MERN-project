const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://shahzad:AyAtdxCvDLYPESyd@cluster0.ijtu76f.mongodb.net/paytm")

const Schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type: String,
        lowercase:true,
        required:true,
        maxLenght:30

    },
    lastName:{
        type:String,
        lowercase:true,
        required:true,
        maxLenght:30
    },
    Ammount:{
        type:Number,
        required:true,

    }
})


const User = mongoose.model('User', Schema)

module.exports = {
    User
}