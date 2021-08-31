const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    body:String,
    userID:String,
    likes:Array,
    comments:Array
})
module.exports=mongoose.model("Post",postSchema)