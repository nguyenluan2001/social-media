const gql = require("graphql-tag")

const typeDefs = gql`
    type User{
        _id:ID
        username:String
        email:String
        gender:String,
        birthday:String,
        phone:String,
        address:String,
        biography:String,
        avatar:String
        token:String
    }
    type Post{
        id:ID
        body:String
        user:User
        likes:[User]
        comments:[Comment]
    }
    input RegisterInput{
        username:String
        password:String
        email:String
    }
    type Comment{
        content:String,
        user:User
    }
    type Query{
        getUsers:[User]
        getUser:User
        checkAuth:User
        getPost(id:ID!):Post
        getPosts:[Post]
    }
    type Mutation{
        register(registerInput:RegisterInput):User
        login(email:String,password:String):User
        updateProfile(
            username:String,
            email:String,
            gender:String,
            birthday:String,
            phone:String,
            address:String,
            biography:String,
            avatar:String
            ):User
        createPost(body:String):Post
        deletePost(id:ID):Boolean
        likePost(id:ID):Boolean
        comment(postID:ID,content:String):Comment
    }
`
module.exports = typeDefs