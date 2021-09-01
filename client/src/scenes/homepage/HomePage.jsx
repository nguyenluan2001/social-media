import React, { useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { getPosts, checkAuth } from "../../graphql-client/query"
import { Link, Redirect, useHistory,Switch,Route } from "react-router-dom"
import PostItem from './components/PostItem'
import ListPosts from './scenes/listPosts/ListPosts'
import CreatePost from './scenes/createPost/CreatePost'
import UpdateProfile from './scenes/updateProfile/UpdateProfile'
import Profile from "./scenes/profile/Profile"
import UserFeed from './scenes/userFeed/UserFeed'
function HomePage() {
    const { loading, error, data } = useQuery(getPosts)
    const checkAuthResult = useQuery(checkAuth)

    const history = useHistory()
    console.log(checkAuthResult?.data)
    async function handleLogout() {
        await localStorage.removeItem("token")
        await checkAuthResult?.client?.clearStore()
        await history.push("/login")
    }
    return (
        <>
            {
                checkAuthResult?.error?.message
                    ? <Redirect to="/login"></Redirect>
                    : <div className="container">
                        <div className="row">
                            <div className="col-12 border-bottom py-3 d-flex justify-content-between ">
                                <Link to="/">Home</Link>
                                {
                                    checkAuthResult?.data?.checkAuth
                                        ? <div className="d-flex align-items-center">
                                            <span>Welcome {checkAuthResult.data.checkAuth.username}</span>
                                           <Link to="/profile" className="btn btn-info">Profile</Link>
                                            <button className="btn btn-info ml-3" onClick={() => handleLogout()}>Logout</button>
                                        </div>
                                        : <div>
                                            <Link to="/login">Login</Link>
                                            <Link to="/register" className="ml-3">Register</Link>
                                        </div>
                                }

                            </div>
                           
                            <Switch>
                                <Route path="/" exact component={ListPosts}></Route>
                                <Route path="/createPost" component={CreatePost}></Route>
                                <Route path="/profile" component={UpdateProfile}></Route>
                                <Route path="/user/:id" component={UserFeed}></Route>
                            </Switch>
                           
                        </div>

                    </div>
            }
        </>

    )
}

export default HomePage
