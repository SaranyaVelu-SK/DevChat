const mongoose = require("mongoose");
 const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://SaranyaSK:Saransk%40mongoDB1@clustersk.5vwcf.mongodb.net/users")
 }
 module.exports = {connectDB}