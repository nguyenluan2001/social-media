import { gql } from "@apollo/client"
const login = gql`
    query login($email:String,$password:String)
    {
        login(email:$email,password:$password)
        {
            username
            email
            token
        }
    }
`
const getPosts = gql`
    query getPosts
    {
        getPosts
        {
            id
            body
            user
            {
                username
            }
            likes
            {
                _id
                username
            }
            comments{
                content
                user
                {
                    _id
                    username
                }
            }

        }
    }
`
const checkAuth = gql`
    query checkAuth
    {
        checkAuth{
            _id
            username
            email
        }
    }
`
const getUser = gql`
    query getUser
    {
        getUser{
            username
            email
            gender
            birthday
            phone
            address
            biography
            avatar
        }
    }
`
export { login, getPosts, checkAuth,getUser }