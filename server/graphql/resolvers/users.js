const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { checkAuth } = require("../../middlewares/checkAuth")
module.exports = {
    Query: {
        async getUsers() {
            let users = await User.find()
            return users
        },
        getLoggedUser:async (parent,args,context)=>{
            let token = context.req.get("Authorization").split(" ")[1]

            let user = await checkAuth(token)
            console.log(user)
            if (user) {
                return await User.findOne({_id:user.id})

            }
            else {
                throw new Error("Please login")
            }
        },
        getUser:async (parent,{id},context)=>{
            return await User.findOne({_id:id})
        },
        async checkAuth(parent, args, { req }) {
            let token = req.headers.authorization.split(" ")[1]
            try {

                let { id } = jwt.verify(token, "ntluan2001")
                let user = await User.findOne({ _id: id })
                return {
                    ...user._doc,
                    id: user._id
                }
            }
            catch {
                throw new Error("Authenticated fail")
            }
        }

    },
    Mutation: {
        async register(_,
            {
                registerInput: { username, password, email }
            }
        ) {
            password = await bcrypt.hash(password, 12)
            let newUser = new User({ username, password, email })
            let res = await newUser.save()
            let token = jwt.sign({
                id: res._id,
            }, "ntluan2001")
            console.log(123)
            return { ...res._doc, _id: res._id, token: token }
        },
        async login(parent, { email, password }) {
            let user = await User.findOne({ email: email })
            console.log(email)
            let comparePass = await bcrypt.compare(password, user.password)
            if (comparePass) {
                let token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    email: user.email
                }, "ntluan2001")

                return { ...user._doc, token }
            }
            else {
                return false
            }
        },
       
        updateProfile: async (parent, args, context) => {
            let token = context.req.get("Authorization").split(" ")[1]

            let user = await checkAuth(token)
            console.log(user)
            if (user) {
                await User.updateOne({ _id: user.id },args)
                console.log(args)
                return await User.findOne({_id:user.id})

            }
            else {
                throw new Error("Please login")
            }
        }

    }
}