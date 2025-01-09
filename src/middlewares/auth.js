const authCall = (req,res,next)=>{
    const token = req.params.token;
    const isAuthenticated = token==="asd";
    if(isAuthenticated){
        next();
    }else{
        res.status(401).send("unauthorized access call")
    }
 }

 module.exports = {authCall}