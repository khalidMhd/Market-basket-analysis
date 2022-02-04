var jwt = require('jsonwebtoken');
const mongoose =  require('mongoose')
const userModel = require('../models/user')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization) {
       return res.status(401).json({message: "You must be login."})
    }
    const token =  authorization.replace('Bearer ',"")
     jwt.verify(token, process.env.JWT_SECRET, (err,payload)=>{
         if(err) {
           return res.status(401).json({message: "Un-authorized User"})
         }
         console.log("payload", payload);
         const {_id} = payload
         userModel.findById(_id).then(userData=>{
             req.user = userData
             next()
         })
     })
}
