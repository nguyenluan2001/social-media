import React from 'react'
import { Container, TopContent, Banner, MainContent, Sidebar, ListPosts } from "./style"
import { useParams, Switch, Route, Link, NavLink } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { getUser,checkAuth } from "../../../../graphql-client/query"
import PostItem from "../../components/PostItem"
import Profile from '../profile/Profile'
function UserFeed(props) {
    const { id } = useParams()
    const checkAuthResult = useQuery(checkAuth)

    const { loading, error, data } = useQuery(getUser, {
        variables: {
            id: id
        }
    })
    console.log(props)
    return (
        <Container className="col-12">
            <TopContent>
                <Banner>
                    <div className="avatar">
                        {data?.getUser.avatar
                            ? <img src={data?.getUser.avatar} alt="" />
                            : <img src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg" alt="" />
                        }
                    </div>
                </Banner>
                <p className="username">{data?.getUser.username}</p>
                <div className="interact-bar">
                    <ul className="navbar-left">
                        <li>
                            <NavLink activeClassName="active" exact to={props.match.url}>
                                <span>Posts</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to={`${props.match.url}/about`}>
                                <span>About</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to={`${props.match.url}/friends`}>
                                <span>Firends</span>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-right">
                        <li>
                            <button className="btn btn-outline-primary">Add friend</button>
                        </li>
                    </ul>

                </div>
            </TopContent>
            <MainContent>
                <Sidebar>
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">List friends</p>
                        </div>
                    </div>
                </Sidebar>
                <Switch>
                    <Route path={`${props.match.url}`} exact>
                        <ListPosts>
                            <div className="container">
                                <div className="row">
                                    {
                                        data?.getUser?.posts.map(item => {
                                            return <PostItem post={item} checkAuthResult={checkAuthResult}></PostItem>
                                        })
                                    }
                                </div>
                            </div>
                        </ListPosts>
                    </Route>
                    <Route path={`${props.match.path}/about`} component={Profile}>
                    </Route>
                </Switch>

            </MainContent>

        </Container>
    )
}

export default UserFeed
