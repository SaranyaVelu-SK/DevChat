const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const {validateInput} = require("./helpers/validation")

const {connectDB} = require("./config/database");
const User = require("./models/user");
const cookieParser = require('cookie-parser');
const userAuth = require('./middlewares/userAuth');

app.use(express.json())      //middleware by express to parse the JSON object - it runs before any request and parses the JSON in req
app.use(cookieParser());        //middleware to parse the cookies - parses the cookies in req
app.post("/adminSignUp",async (req,res)=>{
        //const admin1 = new User(req.body)// creating instance of the User model
        

        
        try{
                validateInput(req.body);

                //password Hashing
                const {firstName, lastName,email,password } = req.body
                const hashedPassword = await bcrypt.hash(password,10);

                const admin = new User({
                        firstName,lastName,email,password:hashedPassword
                })
                await admin.save();
                res.send("data saved successfully");
        }catch(err){
                res.status(400).send("data not saved "+err.message)
                console.log(err)
        }

})

// app.get("/getUser",async (req,res)=>{
//         const emailId = req.body.email;
//         try{
//                 const user = await User.find({email:emailId});
//                 if(user.length === 0){
//                         res.status(404).send("user not found")
//                 }else{
//                         res.send(user)
//                 }
//         }catch(err){
//                 res.status(400).send("Something went wrong")
//         }
        
        
// })

// app.get("/getFeed",async(req,res)=>{
//         try{
//                 const users = await User.find({});
//                 if(users.length === 0){
//                         res.status(404).send(" feed is empty")
//                 }else{
//                         res.send(users)
//                 }
//         }catch(err){
//                 res.status(400).send("Smething went wrong")
//         }
// })

// app.patch("/updateUser/:userId",async(req,res)=>{
//         const newData = req.body;
//         const userId = req.params?.userId;

        
//         try{
//                 //API level data sanitization and data validation
//                 const update_allowed_fields = ["firstName","lastName","age","gender","skills","description","profilePic","password"];
//                 const isUpdateAllowed = Object.keys(newData).every(k => update_allowed_fields.includes(k));
//                 if(!isUpdateAllowed){
//                         throw new Error("update not allowed for email and userId")
//                 }
//                 if(newData.skills.length >5){
//                         throw new Error("only 5 skills are accepted")
//                 }

//                 //update the user
//                 const updatedUser = await User.findByIdAndUpdate({_id:userId},newData,{returnDocument:'after'});
//                 res.send(updatedUser)

//         }catch(err){
//                 res.status(400).send(err.message)
//         }
// })

// app.delete("/deleteUser",async(req,res)=>{
//         const userId = req.body.userId;
//         try{
//                 await User.findByIdAndDelete(userId);
//                 res.send("User deleted Successfully")
//         }catch(err){
//                 res.status(400).send("Something went wrong")
//         }
// })

app.get('/login', async(req,res)=>{

        try{
                const {emailId,password} = req.body;                
                const userInDB = await User.findOne({email:emailId})

                if(!userInDB){
                        throw new Error("Invalid credentials")
                }
                const isPasswordMatched = await userInDB.validatePassword(password);

                if(!isPasswordMatched){
                        throw new Error("Invalid credentials!")
                }

                const token = await userInDB.getJWT();      //create a JWT token with expiration

                res.cookie("jwtToken",token,{expires:new Date (Date.now() + 168*3600000)});           //add token to cookie and send the response to user with expiration
                res.send("logged in Successfully");
                
        }catch(err){
                res.status(400).send(err.message)
        }
})

app.get("/profile",userAuth, async (req,res) =>{
        

        try{
                const user1 = req.user
                res.send(user1)
        }catch(err){
                res.send("ERROR : " + err.message)
        }
        
})

app.post("/sendConnectionRequest", userAuth, async (req,res) =>{
        const user1 = req.user;
        res.send(user1.firstName + " sent connection request")
})
connectDB().then(()=>{
        console.log("DB connected");
        app.listen(7777,()=>{
                console.log("server listening in 7777.....")
            })

}).catch((err)=>{
        console.log(err)
})
