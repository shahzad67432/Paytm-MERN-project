const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const {User, balance} = require('../db/data')
const accountRouter = express.Router()
const  mongoose = require('mongoose')


accountRouter.get('/userBalance', authMiddleware, async (req, res)=>{
    const userId = await balance.findOne({userId: req.userId})
    res.json({
        balance:userId.balance
    })
})
accountRouter.post('/transfer', async (req, res)=>{

    const session = await mongoose.startSession()

    session.startTransaction()
    const ammount = req.body.ammount
    const to = req.body.to
    const account = await balance.findOne({userId: req.userId}).session(session)
    // if(ammount > balance.balance){
    //     console.error("insufficient balance")
    // }
    // const checkReiceiver = await balance.findOne({
    //     account: to
    // }).session(session)
    // if(!checkReiceiver){
    //     res.json(
    //         {
    //             msg:"user not found"
    //         }
    //     )
    // }
    const senderPaymentUpdated = await balance.updateOne({
        userId: req.userId
    },
    {
        $inc:{
            balance: -ammount
        },
        msg:console.log(`${req.userId}`)
    }).session(session)
    const receiverPaymentUpdated = await balance.updateOne({
        userId: to
    },{
        $inc:{
            balance: +ammount
        }
    }).session(session)

    await session.commitTransaction()
    res.json({
        msg:"payment transfered"
    })

})


module.exports = accountRouter