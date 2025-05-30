const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
    {
        firstName:{            //firstName:String ===> firstName:{type:String}
            type:String,
            required:true
        },
        lastName:{
            type:String
        },
        email:{
            type:String,
            required:true,
            trim:true,      //trims the extra whitespace ---> calls .trim() with the email value we give
            unique:true,     //unique is NOT a validator
            validate:{
                validator : function(value){            //validator function
                    return validator.isEmail(value)         //validator package by npm
                },
                message : function(props){                  //props contains path(field name i.e email here) and value(value of the email given)
                    return `${props.value} is not a valid email address`
                }
            }
        },
        password:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            min:[18,"user must be above 18 years to sign up"],              //customized error message for this validation - can be used for all validations like min, max, required
            max:[60, "user must be below 60 yrs, but you are {VALUE}"]              //customized error msg with the input value
        },
        gender:{
            type:String,
            enum:{
                    values:["male","female","others"],              //custom error mesaage for VALIDATIONS
                    message:"{VALUE} is not a valid gender"
            }
        },
        profilePic:{
            type:String,
            validate:{
                validator: function(value){
                    return validator.isURL(value)
                },
                message:function(props){
                    return `not a valid url`
                }
            }
        },
        skills:{
            type:[String],        //array of strings
        },
        description:{
            type:String,
            default:function(){                         
                return `Hi , I'm ${this.firstName}`
            }
        }
    },
    {
        timestamps: true    //date and time that represents when the document is created and updated --->changes during POST,PUT and PATCH
    },
    {
        collection : 'user'   //explicitly adding the collection name in mongoDB to this schema
    });
    
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id},"Dev@CHAT27",{expiresIn:'1d'});
    return token
}

userSchema.methods.validatePassword = async function(inputPassword){
    
    const hashedPassword = this.password
    const isPasswordMatched = await bcrypt.compare(inputPassword,hashedPassword);

    return isPasswordMatched;

}
 const userModel = mongoose.model("User",userSchema);

 module.exports = userModel;