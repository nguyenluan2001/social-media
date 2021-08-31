const jwt=require("jsonwebtoken")
const User=require("../models/User")
const checkAuth=async (requestToken)=>{
    try
    {

        let payload=await jwt.verify(requestToken,"ntluan2001")
        let user=await User.findOne({_id:payload.id})
        if(user)
        {
            return payload
        }
        else
        {
             throw new Error("Authenticated failed")
        }
    }
    catch{
        throw new Error("Authenticated failed")
    }
}
module.exports={checkAuth}