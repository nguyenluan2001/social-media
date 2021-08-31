import React from 'react'
import {useFormik} from "formik"
import {useMutation} from "@apollo/client"
import {createPost} from "../../../../graphql-client/mutation"
import {getPosts} from "../../../../graphql-client/query"
import {useHistory} from "react-router-dom"
function CreatePost() {
    const [createPostMutation,dataMutation]=useMutation(createPost)
    const history=useHistory()
    const formik=useFormik({
        initialValues:{
            body:""
        },
        onSubmit:values=>{
            console.log(values)
            createPostMutation({
                variables:{
                    body:values.body
                },
                refetchQueries:[{query:getPosts}]
            })
            history.push("/")
        }
    })
    return (
        <div className="col-12">
            <h4>Create Post</h4>
            <form action="" onSubmit={formik.handleSubmit}>
                <textarea name="body" onChange={formik.handleChange} id="" cols="30" rows="10" className="form-control"></textarea>
                <button className="btn btn-success mt-3">Create</button>
            </form>
        </div>
    )
}

export default CreatePost
