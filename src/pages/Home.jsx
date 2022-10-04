import React ,{useState, useEffect}from 'react'
import Sidebar from '../components/Sidebar'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { logout } from '../action/userAction'
import { Link, useNavigate} from 'react-router-dom'
import Loading from "../components/Loading"


import { deletew, item } from '../action/itemAction'

const Home = () => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector((state)=>state.userLogin)
    const {userInfo} = userLogin; 

    const userItem = useSelector((state)=>state.userItem)
    const {loading, error,items} = userItem;

    const updateItem = useSelector((state)=>state.updateItem)
    const {success:updateSccesss,error:updateError} = updateItem

    const deleteItem = useSelector((state)=>state.deleteItem)

    const {success:deleteSuccess,error:deleteError} = deleteItem

    const handleLogout = () =>{
        dispatch(logout())
    }

    const handleDelete = (id) =>{
        if(window.confirm(`Are you sure you want to delete Item`)){
        dispatch(deletew(id))
        setMessage("Item deleted Successful")
        setTimeout(()=>{
            setMessage("")
        },4000)
        }
       
    }

    useEffect(()=>{
        dispatch(item())
        if(!userInfo){
            navigate('/')
        }

     },[dispatch,userInfo,navigate,updateSccesss,deleteSuccess])


    

    const addItem = () =>{
        let total = 0;
        items && items.forEach((item)=>{
            total += item.amount;
            
        })
        return total
    }
  return (
    <Sidebar >
        <div className="container mt-5">

        <p className="text-center"><strong>Welcome Back {`${userInfo.username}`}</strong></p>
        <Link to="/" className="btn btn-primary" onClick={handleLogout}>Logout</Link>
        <h1 className="text-center">All Items And Total</h1>
        {error ? <div className='alert alert-danger'>{error}</div>:null}
        {message && <div className='alert alert-success'>{message}</div>}
        {updateError ? <div className='alert alert-danger'>{updateError}</div>:null}
        {deleteError ? <div className='alert alert-danger'>{deleteError}</div>:null}
        {loading && <Loading />}
                
            <div className="row">
                
                <div className="col-12">
            <table className="table table-striped">      
                   <thead>
                    <tr>
                        <td>S/N</td>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Date</td>
                        <td>Action</td>
                        </tr>
                   </thead>
                <tbody>
                {items && items.map((item, index)=>(
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                            <td>
                            <Link to={`/update/${item._id}`}><a className="btn btn-info">Edit</a></Link>|
                            <a  onClick={()=>handleDelete(item._id)} className="btn btn-danger">delete</a>
                            </td>
                        </tr>
                ))}
                <tr>
                    <td >Total is </td>
                    <td >{addItem()}</td>
                </tr>
                </tbody>
        </table>
           

    
                  
                </div>

                
            </div>
        </div>
      </Sidebar>
    
  )
}
export default  Home;
