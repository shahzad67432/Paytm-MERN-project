const jwt = require('jsonwebtoken')
const JWT_Key = require('../config')

const authMiddleware = (req, res, next)=>{
    const authHeader = req.header.authorization
    if(!authHeader || authHeader.startsWith('Bearer')){
        res.status(403).json({msg:"token not present"})
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token, JWT_Key)
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            res.status(403).json({})
        }
    }catch(err){
        res.status(403).json({})
    }
}

module.exports = {
    authMiddleware
}