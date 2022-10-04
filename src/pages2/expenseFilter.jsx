import axios from 'axios'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const ExpenseFilter = () => {
    const [expenses, setExpenses] = useState([])
    const [message, setMessage] = useState("")

    const fetchExpense = async(e) => {
        e.preventDefault()
        const datePicked = e.target['date'].value
        const dateSelected = e.target['selected'].value

        if(!datePicked || !datePicked > 0){
            setMessage("please select date")
            setTimeout(()=>{
                return setMessage("")
            },5000)
        }

        try {
            if(dateSelected === 'date'){
                const date = new Date(datePicked).toDateString()
                const {data} = await axios.get(`http://localhost:5000/api/expense/all?date=${date}`)
                if(data.expense.length > 0){
                    return setExpenses(data.expense)
                }
                else {
                    setMessage("No expense for that date")
                    setTimeout(()=>{
                        return setMessage("")
                    },5000)
                }
            }

            if(dateSelected === 'month'){
                const month = new Date(datePicked).getMonth()

                const {data} = await axios.get(`http://localhost:5000/api/expense/all?monthYear=${month}`)
                if(data.expense.length > 0){
                    return setExpenses(data.expense)
                }
                else {
                    setMessage("No expense for that month")
                    setTimeout(()=>{
                        return setMessage("")
                    },5000)
                }
            }
   
            if(dateSelected === 'year'){
                const year = new Date(datePicked).getFullYear()
                const {data} = await axios.get(`http://localhost:5000/api/expense/all?year=${year}`)
                if(data.expense.length > 0){
                    return setExpenses(data.expense)
                }
                else {
                    setMessage("No expense for that year")
                    setTimeout(()=>{
                        return setMessage("")
                    },5000)
                }
            }
            
                
        } catch (error) {
            setMessage(error)
            setTimeout(()=>{
                return setMessage("")
            },5000)
        }
    }
    
    const displayExpense = () => {
        if(expenses.length > 0){
        return(
        <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <td>S/N</td>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenses.map((expense, index)=>(
                                <tr key={expense._id}>
                                    <td>{index + 1}</td>
                                    <td>{expense.name}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.date}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td>Total Searched Expense</td>
                            <td>{addExpense()}</td>
                        </tr>
                    </tbody>
                </table>
        </div>
   ) }}

    const addExpense = () => {
        let total = 0;
        expenses.forEach((expense)=>{
            total += expense.amount
        })
        return total
    }
    
   
  return (
    <Sidebar>
    <div className="container mt-3">
        {displayExpense()}
        {message && <div className="alert alert-danger">{message}</div>}
        <h1 className="text-center">Filter and Search for Expenses</h1>

        <form onSubmit={fetchExpense}>
            <div className="row">
            <div className="col-6">
                <div className="form-group">
                    <label htmlFor='date'>Filter by Date</label>
                    <input type="date" className="form-control" name="date" id="date" />
                </div>
            </div>
            <div className="col-6">
                <div className="form-group">
                    <label htmlFor='date'>Filter by Year/month</label>
                    <select name="selected" className="form-control" id="selected">
                        <option value="date">Date</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>

                    </select>
                </div>
            </div>
            </div>
            

           <input type="submit" value="Search" className='btn btn-info'/>
        </form>        
    </div>
    </Sidebar>
  )
}

export default ExpenseFilter