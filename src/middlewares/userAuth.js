const jwt = require("jsonwebtoken");
const User = require("../models/user");
 
const userAuth = async(req,res,next)=>{

    try{
        const {jwtToken} = req.cookies;
        if(!jwtToken){
            throw new Error("Token is invalid, log in again !")
        }
        const decodedValue = await jwt.verify(jwtToken,"Dev@CHAT27");
        if(!decodedValue){
            throw new Error("Log in to proceed")
        }

        const user = await User.findById({_id:decodedValue._id});

        if(!user){
            throw new Error("User not found")
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
};

module.exports = userAuth;