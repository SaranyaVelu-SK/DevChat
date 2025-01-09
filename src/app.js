const express = require('express');
const app = express();

const {authCall} = require("./middlewares/auth")

app.use("/admin/:token",authCall)
app.get("/admin/:token/getData",(req,res,next)=>{    
        res.send("got Admin Data")
})

app.get("/admin/:token/deleteData",(req,res)=>{
        res.send("deleted Admin Data")
})
app.listen(7777,()=>{
    console.log("server listening in 7777.....")
})