import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../action/userAction"
import Loading from "../components/Loading"


const Login = () =>{
    const [username, setUsername]  = useState("")
    const [password, setPassword]  = useState("")
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const userLogin = useSelector((state)=>state.userLogin)

    const {loading, error, userInfo} = userLogin;

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(username,password))
          }
        
    useEffect(()=>{
       if(userInfo){
           navigate('/home')
           setMessage('Login Successful')
           
       }
    },[userInfo,navigate])
    return (
        <div className="container mt-5">
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className='alert alert-danger'>{message}</div>}

            {loading && <Loading />}
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="text">Username:</label>
                            <input type="text" onChange={(e)=>setUsername(e.target.value)} className="form-control" placeholder="Enter Username" id="text" />
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
        </div>
    )
}
export default Login