import React, { useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { getPosts, checkAuth } from "../../../../graphql-client/query"
import { Link, Redirect, useHistory } from "react-router-dom"
import PostItem from '../../components/PostItem'

function ListPosts() {
    const { loading, error, data } = useQuery(getPosts)
    const checkAuthResult = useQuery(checkAuth)
    return (
        <>
            <div className="col-12 pt-3">
                <h4>Recent posts</h4>
                <Link to="/createPost">Create Post</Link>
            </div>
            {

                loading ? <p>Loading...</p> : data?.getPosts.map(item => {

                    return <PostItem post={item} checkAuthResult={checkAuthResult}></PostItem>
                })
            }
        </>
    )
}

export default ListPosts
