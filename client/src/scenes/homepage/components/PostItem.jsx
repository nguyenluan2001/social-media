import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from "@apollo/client"
import { Link, Redirect, useHistory } from "react-router-dom"
import { likePost,comment,deletePost } from "../../../graphql-client/mutation"
import { getPosts } from "../../../graphql-client/query"
import {FaTrashAlt} from "react-icons/fa"
const commentStyle={
    height:"150px",
    overflowY:"scroll"
}
function Postpost({ post, checkAuthResult }) {
    const [toggleLikes, setToggleLikes] = useState(false)
    const [toggleComment, setToggleComment] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const [likePostMutation, dataMutation] = useMutation(likePost)
    const [commentMutation,dataMutationComment]=useMutation(comment)
    const [deletePostMutation,dataMutationDeletePost]=useMutation(deletePost)
    function handleLikePost() {
        likePostMutation({
            variables: {
                id: post.id
            },
            refetchQueries: [{ query: getPosts }]
        })
    }
    function handleChangeComment(e) {
        setCommentContent(e.target.value)
    }
    function handleSendComment(e) {
        e.preventDefault()
        commentMutation({
            variables:{
                postID:post.id,
                content:commentContent
            },
            refetchQueries:[{query:getPosts}]
        })
        setCommentContent("")
    }
    function handleDeletePost()
    {
        deletePostMutation({
            variables:{
                id:post.id
            },
            refetchQueries:[{quey:getPosts}]
        })
    }
    return (
        <div className="col-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <div className="top-content d-flex justify-content-between">
                        <div className="user">
                            <p className="m-0"><strong>
                                <Link to={`/user/${checkAuthResult.data.checkAuth._id}`}>{post.user.username}</Link>
                                </strong></p>
                            <p className="m-0">2 hours</p>
                        </div>
                        <img width="100px" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
                    </div>
                    <div className="body">{post.body}</div>
                    <div class="btn-group mx-auto" role="group" aria-label="Basic example">
                        {
                            post.likes.findIndex(item => item._id == checkAuthResult.data.checkAuth._id) != -1
                                ? <button type="button" class="btn btn-primary" onClick={() => handleLikePost()}>
                                    Unlike
                                </button>
                                : <button type="button" class="btn btn-primary" onClick={() => handleLikePost()}>
                                    Like
                                </button>
                        }

                        <button type="button" class="btn btn-secondary" onClick={() => setToggleComment(pre => !pre)}>
                            Comments <span class="badge badge-light">{post.comments.length}</span>
                        </button>
                        {
                            post.user.username == checkAuthResult.data.checkAuth.username
                                ? <button className="btn btn-danger" onClick={()=>handleDeletePost()}>
                                    <FaTrashAlt></FaTrashAlt>
                                </button> : ""
                        }
                    </div>
                    <p onClick={() => setToggleLikes(pre => !pre)}>{post.likes.length} like this post</p>
                    {toggleLikes && <ul className="likes">
                        {
                            post.likes.map(item => {
                                return <li>{item.username}</li>
                            })
                        }
                    </ul>}
                    {
                        toggleComment && <div className="form-group">
                            <ul className="comments" style={commentStyle}>
                                {
                                    post?.comments.map(item => {
                                        return <li>{item.user.username}: {item.content}</li>
                                    })
                                }
                            </ul>
                            <form action="" onSubmit={(e) => handleSendComment(e)}>
                                <input type="text" className="form-control" value={commentContent} onChange={(e) => handleChangeComment(e)} />
                                <button className="btn btn-success">Send</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Postpost
