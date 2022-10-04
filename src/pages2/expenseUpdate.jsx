import { NavigateBefore } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import { updateExpenseAction } from '../action/expenseAction'
import Loading from '../components/Loading'


const ExpenseUpdate = () => {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [message, setMessage] = useState("")

    const {id} = useParams()
    const navigate = useNavigate()

const dispatch = useDispatch()

const updateExpense = useSelector((state)=>state.updateExpense)

const {loading,error} = updateExpense

    const handleUpdate = (e) =>{
        e.preventDefault()
        dispatch(updateExpenseAction(id,name,amount))
        navigate('/expense')
        setMessage("Expense updated successful")
    }

    useEffect(() => {
     const fetchExpense = async() =>{
        try {
            const {data} = await axios.get(`http://localhost:5000/api/expense/${id}`)
            setName(data.name)
            setAmount(data.amount)
            
        } catch (error) {
           setMessage(error)
           setTimeout(()=>{
            return setMessage("")
           }, 4000) 
        }
     }
     fetchExpense()
    }, [id])
    
  return (
    <div className='container mt-3'>
    {error && <div className='alert alert-danger'>{error}</div>}
    {message && <div className='alert alert-success'>{message}</div>}
    {loading && <Loading />}
    <form className="form" onSubmit={handleUpdate}>
            <div className="row">
                <div className="col-6">
                    <div className="form-grop">
                        <lable htmlFor="name">Expense Name</lable>
                        <input type="text" name="name"placeholder='Enter expense'value={name} onChange={(e)=>setName(e.target.value)} className="form-control" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-grop">
                        <lable htmlFor="name">Expense Amount</lable>
                        <input type="text" name="name"placeholder='Enter Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} className="form-control" />
                    </div>
                </div> 
            </div>
            <hr />
            <input type="submit" value="Add Expense" className='btn btn-info' />
     </form>
        </div>

  )
}

export default ExpenseUpdate