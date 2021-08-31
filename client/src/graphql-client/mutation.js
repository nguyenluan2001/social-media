import { gql } from "@apollo/client"
const login = gql`
    mutation login($email:String,$password:String)
    {
        login(email:$email,password:$password)
        {
            username
            email
            token
        }
    }

`
const updateProfile = gql`
    mutation updateProfile(
        $username:String,
        $email:String,
        $gender:String,
        $birthday:String,
        $phone:String,
        $address:String,
        $biography:String,
        $avatar:String
        )
        {
            updateProfile(
                username:$username,
                email:$email,
                gender:$gender,
                birthday:$birthday,
                phone:$phone,
                address:$address,
                biography:$biography,
                avatar:$avatar,
            )
            {
            username
            email,
            gender,
            birthday,
            phone,
            address,
            biography,
            avatar
            }
        }
`
const createPost = gql`
    mutation createPost($body:String)
    {
        createPost(body:$body)
        {
            body
        }
    }
`
const deletePost = gql`
    mutation deletePost($id:ID)
    {
        deletePost(id:$id)
    }
`
const likePost = gql`
    mutation likePost($id:ID)
    {
        likePost(id:$id)
    }
`
const comment = gql`
    mutation comment($postID:ID,$content:String)
    {
        comment(postID:$postID,content:$content)
        {
            content
        }
    }
`
export { login, likePost, comment, createPost, deletePost, updateProfile }