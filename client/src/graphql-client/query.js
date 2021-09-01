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
                _id
                username
                avatar
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
const getLoggedUser = gql`
    query getLoggedUser
    {
        getLoggedUser{
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
const getUser = gql`
    query getUser($id:ID)
    {
        getUser(id:$id)
        {
            username
            email
            gender
            birthday
            phone
            address
            biography
            avatar
            posts{
                id
                user{
                    _id
                    username
                    avatar
                }
                body
                likes{
                    _id
                    username
                }
                comments{
                    user
                    {
                        username
                    }
                    content
                }
            }
        }
    }
`
export { login, getPosts, checkAuth, getLoggedUser,getUser }