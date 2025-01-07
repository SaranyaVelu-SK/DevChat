const express = require('express');
const app = express();

app.use("/",(req,res)=>{
    res.send("Welcome")
})
app.use('/contact',(req,res)=>{
    res.send("9876543210")
})
app.use('/user',(req,res)=>{
    res.send("Hello Saranya")
})
app.use('/end',(req,res)=>{
    res.send("Thankyou")
})
app.listen(7777,()=>{
    console.log("server listening in 7777.....")
})