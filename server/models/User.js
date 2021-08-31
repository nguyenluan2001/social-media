const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    username:String,
    password:String,
    email:String,
    gender:String,
    birthday:String,
    phone:String,
    address:String,
    biography:String,
    avatar:String,
    createdAt:String
})
module.exports=mongoose.model("User",userSchema)