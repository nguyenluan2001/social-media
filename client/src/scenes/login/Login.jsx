import React,{useEffect} from 'react'
import { useFormik } from "formik"
import { useQuery,useMutation } from "@apollo/client"
import { login } from "../../graphql-client/mutation"
import {useHistory} from "react-router-dom"
function Login() {
    const history=useHistory()
    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit:async  (values) => {
           await loginMutation({
                variables:{
                    email:values.email,
                    password:values.password
                }
            })
            await history.push("/")

        }
    })
  const [loginMutation,dataMutation]=useMutation(login)
  useEffect(()=>{
    if(!dataMutation.loading)
    {
        localStorage.setItem("token",dataMutation?.data?.login?.token)
    }
  },[dataMutation.loading])
  console.log(dataMutation)
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mx-auto mt-5 border p-5">
                    <h2 className="text-center">Login</h2>
                    <form action="" onSubmit={loginFormik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="text" className="form-control" name="email" onChange={loginFormik.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" className="form-control" name="password" onChange={loginFormik.handleChange} />
                        </div>
                        <button className="btn btn-success">Login</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
