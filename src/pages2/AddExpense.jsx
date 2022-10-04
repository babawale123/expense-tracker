import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createExpense } from '../action/expenseAction'
import Loading from '../components/Loading'
import Sidebar from '../components/Sidebar'

const AddExpense = () => {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const addExpense = useSelector((state)=>state.addExpense)

    const {loading, error} =addExpense

    const addExpenseHandler = (e) => {
        e.preventDefault()
        dispatch(createExpense(name, amount))
        navigate('/expense')
       
    }
  return (
    <Sidebar>
    <div className='container mt-3'>
        {loading && <Loading />}
        <form className="form" onSubmit={addExpenseHandler}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-grop">
                            <lable htmlFor="name">Expense Name</lable>
                            <input type="text" name="name"placeholder='Enter expense' onChange={(e)=>setName(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-grop">
                            <lable htmlFor="name">Expense Amount</lable>
                            <input type="text" name="name"placeholder='Enter Amount' onChange={(e)=>setAmount(e.target.value)} className="form-control" />
                        </div>
                    </div> 
                </div>
                <hr />
                <input type="submit" value="Add Expense" className='btn btn-info' />
         </form>
            </div>
     </Sidebar>
    
  )
}

export default AddExpense