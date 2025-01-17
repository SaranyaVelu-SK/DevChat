const express = require('express');
const app = express();

const {connectDB} = require("./config/database");
const User = require("./models/user")

app.use(express.json())      //middleware by express to parse the JSON object - it runs before any request and parses the JSON in req
app.post("/adminSignUp",async (req,res)=>{
        const admin1 = new User(req.body)   // creating instance of the User model

        try{
                await admin1.save();
                res.send("data saved successfully");
        }catch(err){
                res.status(400).send("data not saved")
                console.log(err)
        }

})

connectDB().then(()=>{
        console.log("DB connected");
        app.listen(7777,()=>{
                console.log("server listening in 7777.....")
            })

}).catch((err)=>{
        console.log(err)
})
