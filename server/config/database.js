const mongoose=require("mongoose")
function connect() {
    try {
        mongoose.connect('mongodb+srv://luannguyen:ntluan2001@demo-express.6rj7r.mongodb.net/social-media?retryWrites=true&w=majority',
         { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connect database success")
    }
    catch (err) {
        console.log("error", err)
    }
}
module.exports = { connect }