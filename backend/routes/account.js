const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const {User, Ammount} = require('../db/data')
const accountRouter = express.Router()


accountRouter.get('/userBalance', authMiddleware, (req, res)=>{
    const userId = balance.findOne({userId: req.userId})
    res.json({
        balance:userId.balance
    })
})
accountRouter.post('/transfer', async (req, res)=>{

    const session = await mongoose.startSession()

    session.startTransaction()
    const ammount = req.body.ammount
    const receiver = req.body.receiver
    const userId = await balance.findOne({userId: req.userId}).session(session)
    if(ammount > userId.balance){
        console.error("insufficient balance")
    }
    const checkReiceiver = await accountRouter.findOne({
        userId: receiver
    }).session(session)
    if(!checkReiceiver){
        res.json(
            {
                msg:"user not found"
            }
        )
    }

    const senderPaymentUpdated = await Account.UpdateOne({
        userId: req.userId
    },
    {
        $inc:{
            balance: -ammount
        }
    }).session(session)
    const receiverPaymentUpdated = await Account.UpdateOne({
        userId: receiver
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