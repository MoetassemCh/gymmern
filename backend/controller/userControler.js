const jwt = require("jsonwebtoken");
const User=require('../models/userModel')
const asyncHandler = require("express-async-handler");

const createToken=(_id)=>{
return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "24h"});
}

const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body


    try{
    const user=await User.login(email,password)
    const token=createToken(user._id)
    res.status(200).json({email,token})

}catch(error){
    res.status(400).json({error:error.message})
}

});



const signupUser = asyncHandler(async (req, res) => {
const{email,password}=req.body


try{
    const user=await User.signup(email,password)
    const token=createToken(user._id)
    res.status(200).json({email,token})

}catch(error){
    res.status(400).json({error:error.message})
}
});


module.exports={
    loginUser,
    signupUser
}