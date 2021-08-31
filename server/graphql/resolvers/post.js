const Post = require("../../models/Post")
const { checkAuth } = require("../../middlewares/checkAuth")
module.exports = {
    Query: {
        getPost: async (parent, { id }, context) => {
            return await Post.findOne({ _id: id })

        },
        getPosts: async (parents, args, context) => {
            return await Post.find({})
        }
    },
    Mutation: {
        createPost: async (parent, { body }, context) => {
            let token = context.req.get("Authorization").split(" ")[1]

            let user = await checkAuth(token)
            console.log(user)
            if (user) {
                let post = new Post({ body: body, userID: user.id })
                return await post.save()
            }
            else {
                throw new Error("Please login")
            }


        },
        deletePost: async (parent, { id }, context) => {
            let token = context.req.get("Authorization").split(" ")[1]

            let user = await checkAuth(token)
            console.log(user)
            if (user) {
                await Post.deleteOne({ _id: id })
                return true

            }
            else {
                throw new Error("Please login")
            }
        },
        likePost: async (parent, { id }, context) => {
            let token = context.req.get("Authorization").split(" ")[1]

            let user = await checkAuth(token)
            if (user) {
                let post = await Post.findOne({ _id: id })
                if (post.likes) {

                    let newLikes = [...post.likes]
                    if (newLikes.includes(user.id)) {
                        newLikes = newLikes.filter(item => item != user.id)
                    }
                    else {
                        newLikes.push(user.id)

                    }
                    await Post.updateOne({ _id: id }, {
                        likes: newLikes
                    })
                }
                else {
                    let newLikes = []
                    newLikes.push(user.id)
                    await Post.updateOne({ _id: id }, {
                        likes: newLikes
                    })
                }

                return true

            }
            else {
                throw new Error("Please login")
            }
        },
        comment: async (parent, { postID, content }, context) => {
            let token = context.req.get("Authorization").split(" ")[1]

            let user = await checkAuth(token)
            if (user) {
                let post = await Post.findOne({ _id: postID })
                if (post.comments) {
                    let newComments = post.comments
                    newComments.push({
                        content: content,
                        userID: user.id
                    })
                    await Post.updateOne({ _id: postID }, {
                        comments: newComments
                    })
                    return {
                        content: content,
                        userID: user.id
                    }
                }
                else {
                    let newComments = []
                     newComments.push({
                        content: content,
                        userID: user.id
                    })
                    await Post.updateOne({ _id: postID }, {
                        comments: newComments
                    })
                    return {
                        content: content,
                        userID: user.id
                    }
                }

                return true

            }
            else {
                throw new Error("Please login")
            }
        }

    }
}