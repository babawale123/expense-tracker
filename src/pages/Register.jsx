import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from "react-redux"
import { register } from '../action/userAction'
import Loading from '../components/Loading'
import { useNavigate } from "react-router-dom"



const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const  userRegister = useSelector((state)=>state.userRegister)
    const  userLogin = useSelector((state)=>state.userLogin)

    const {loading, error, success} = userRegister

    const handleSubmit = (e) =>{
        e.preventDefault()      
        dispatch(register(username,email,password))
    }
    useEffect(()=>{
        
    },[success])
  return (
    <div className="row mt-3">
           
                <div className="col-3"></div>
                <div className="col-6">
                    <form className="form" onSubmit={handleSubmit}>
                        {loading && <Loading />}
                        {error && <div className="alert alert-danger">{error}</div>}
                        {message && <div className="alert alert-info">{message}</div>}
                        <div className="form-group">
                            <label htmlFor="text">Username:</label>
                            <input type="text" onChange={(e)=>setUsername(e.target.value)} className="form-control" placeholder="Enter Username" id="text" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Email" id="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input type="password"  onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter password" id="pwd" />
                        </div>
                      
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                </div>
                <div className="col-3"></div>
            </div>
  )
}

export default Register