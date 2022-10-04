import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { update } from '../action/itemAction'
import Loading from '../components/Loading'

const UpdateItem = ({match}) => {
    const [name, setName] = useState({})
    const [amount, setAmount] = useState({})


    const navigate = useNavigate()
    const {id} = useParams();

    const dispatch = useDispatch()

    const updateItem = useSelector((state)=>state.updateItem)
    const {loading,error} = updateItem

    const updateHandler = (e) =>{
        e.preventDefault()
        dispatch(update(id,name,amount))
        navigate('/')
    }

    useEffect(() => {
        const fetching = async () => {
        
         try {
            const {data} = await axios.get(`http://localhost:5000/api/income/${id}`);
            setName(data.name);
            setAmount(data.amount);
         } catch (error) {
            console.log(error)
         }
        };
        fetching();
    }, [id])
  return (
    <Sidebar>
    <div className="container mt-5">
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <Loading />}
    <form onSubmit={updateHandler}>
        <div className="row">
            <div className="col-6">
                <div className="form-group">
                            <label htmlFor="text">Item Name</label>
                            <input type="text" placeholder="Enter Item Name" value={name} className="form-control" onChange={(e)=>setName(e.target.value)}  />
                </div>
            </div>
            <div className="col-6">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="text">Item Amount</label>
                        <input type="text" placeholder="Enter Item Amount" value={amount} className="form-control" onChange={(e)=>setAmount(e.target.value)} v />
                    </div>
                </div>
            </div>
            
        </div>
        <input type="submit" value='submit' className="btn btn-primary" />
     </form>
 </div>
</Sidebar>
  )
}

export default UpdateItem