const userResolvers = require("../resolvers/users")
const postResolvers = require("../resolvers/post")
const User = require("../../models/User")
module.exports = {
    Post: {
        user: async (parent, args) => await User.findOne({ _id: parent.userID }),
        likes: async (parent, args, context) => {
            let users = []
            for (let i = 0; i < parent.likes.length; i++) {
                let user = await User.findOne({ _id: parent.likes[i] }, { password: 0 })
                users.push(user)
            }
            return users
        }
    },
    Comment:{
        user:async (parent,args)=>{
            let user=await User.findOne({_id:parent.userID})
            return {...user._doc}
        }
    },
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation
    }
}