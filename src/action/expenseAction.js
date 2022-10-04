import axios from "axios"
import { ADD_EXPENSE_FAILED, ADD_EXPENSE_REQUEST, ADD_EXPENSE_SUCCESS, DELETE_EXPENSE_FAILED, DELETE_EXPENSE_REQUEST, DELETE_EXPENSE_SUCCESS, EXPENSE_ITEM_FAILED, EXPENSE_ITEM_REQUEST, EXPENSE_ITEM_SUCCESS, UPDATE_EXPENSE_FAILED, UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS } from "../constants/expenseConstant"

export const allExpense = (name,amount) => async(dispatch,getState)=>{
    try {
        dispatch({type:EXPENSE_ITEM_REQUEST})
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                "authorization":`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`http://localhost:5000/api/expense`,config)
        dispatch({type:EXPENSE_ITEM_SUCCESS, payload:data.expense})
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        dispatch({type:EXPENSE_ITEM_FAILED,payload:message})
    }
}

export const createExpense = (name,amount) =>async(dispatch,getState) =>{
    try {
        dispatch({type:ADD_EXPENSE_REQUEST});

        const {userLogin:{userInfo}} = getState()
        const config ={
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`http://localhost:5000/api/expense`,{name,amount}, config)
        dispatch({type:ADD_EXPENSE_SUCCESS, payload:data.expense})

    } catch (error) {
        const message = error.response && error.response.data.message ?error.response.data.message : error.message
        dispatch({type:ADD_EXPENSE_FAILED, payload:message})
    }
}

export const updateExpenseAction = (id,name,amount) => async(dispatch, getState)=>{
    try {
        dispatch({type:UPDATE_EXPENSE_REQUEST})
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${userInfo.token}`
             }
        }
        const {data} = await axios.put(`http://localhost:5000/api/expense/${id}`,{name,amount}, config)
        dispatch({type:UPDATE_EXPENSE_SUCCESS, payload:data.expense})
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:UPDATE_EXPENSE_FAILED, payload:message})
    }
}

export const deleteExpenseAction = (id) => async(dispatch,getState)=>{
    try {
        dispatch({type:DELETE_EXPENSE_REQUEST})
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                "authorization":`Bearer ${userInfo.token}`
             }
        }
        const {data} = await axios.delete(`http://localhost:5000/api/expense/${id}`,config)
        dispatch({type:DELETE_EXPENSE_SUCCESS, payload:data.expense})
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:DELETE_EXPENSE_FAILED, payload:message})
    }
}