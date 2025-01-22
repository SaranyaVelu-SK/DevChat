const validator = require("validator");

const validateInput = (req)  =>{
    const {firstName, lastName , email, password} = req;
    if(!firstName || !lastName){
        throw new Error("Name is ot valid")
    }else if(firstName.length <4 || firstName.length >50){
        throw new Error("First name characters should be above 4 and below 50")
    }

    if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password")
    }
}

module.exports = {validateInput}