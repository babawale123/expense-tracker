import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useDispatch,useSelector } from 'react-redux'
import { allExpense, deleteExpenseAction } from '../action/expenseAction'
import { useNavigate, Link } from 'react-router-dom'
import Loading from '../components/Loading'



const HomeExpense = () => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const expenseItem = useSelector((state)=>state.expenseItem)
    const userLogin = useSelector((state)=>state.userLogin)

    const addExpense = useSelector((state)=>state.addExpense)
    const updateExpense = useSelector((state)=>state.updateExpense)
    const deleteExpense = useSelector((state)=>state.deleteExpense)


    const {success,error:addError} = addExpense
    const {error:deleteError, success:deleteSuccess} = deleteExpense
    const {loading, expenses ,error} = expenseItem
    const {userInfo} = userLogin


   const {error:updateError, success:updateSuccess} = updateExpense

   //DELETE EXPENSE
   const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete expense")){
        dispatch(deleteExpenseAction(id))
        setMessage("Item deleted Successful")
        setTimeout(()=>{
            setMessage("")
        },4000)
        
    }
   }

    useEffect(()=>{
        dispatch(allExpense())
        if(!userInfo){
            navigate('/')
        }
    },[dispatch,userInfo,navigate,success,updateSuccess,deleteSuccess])

    const addExpenseHandler = () =>{
        let total = 0;
        expenses && expenses.forEach((expen)=>{ 
            total += expen.amount
        })
        return total;
    }
     
  return (
    <Sidebar>
        <div className="container mt-3">
        <h1 className="text-center">All Expenses And Total</h1>

            {loading && <Loading />}
            {error && <div className='alert alert-danger'>{error}</div>}
            {message && <div className='alert alert-success'>{message}</div>}
            {deleteError ? <div className='alert alert-danger'>{deleteError}</div>:null}
            {updateError ? <div className='alert alert-danger'>{updateError}</div>: null}
            {addError && <div className='alert alert-danger'>{addError}</div>}
           <table className="table table-striped table-bordered">
                <thead>
                    <tr className="text-center">
                    <td>S/N</td>
                    <td>Name</td>
                    <td>Amount</td>
                    <td>Date</td>
                    <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses && expenses.map((expense, index)=>(
                            <tr key={expense._id}>
                                <td>{index + 1}</td>
                                <td>{expense.name}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.date}</td>
                                <td><Link to={`/expenseUpdate/${expense._id}`}><a className="btn btn-info">Edit</a></Link>|
                                    <a onClick={()=>handleDelete(expense._id)} className='btn btn-danger'>Delete</a>
                                </td>
                            </tr>
                            
                        ))}
                        <tr>
                        <td col={4}>Total expenses</td>
                        <td>{addExpenseHandler()}</td>
                        </tr>
                </tbody>
           </table>
        </div>
    </Sidebar>
  )
}

export default HomeExpense