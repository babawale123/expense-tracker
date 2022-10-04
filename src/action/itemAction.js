import axios from "axios";
import { ADD_ITEM_FAILED, ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, UPDATE_ITEM_FAILED, UPDATE_ITEM_REQUEST, UPDATE_ITEM_SUCCESS, USER_ITEM_FAILED, USER_ITEM_REQUEST, USER_ITEM_SUCCESS } from "../constants/itemConstant"

export const item = () => async(dispatch, getState)=>{
    try {
        dispatch({type:USER_ITEM_REQUEST});
        
        const {userLogin:{userInfo}}= getState();

        const config ={
            headers:{
                "authorization":`Bearer ${userInfo.token}`
            }
        }
        const {data} =  await axios.get('http://localhost:5000/api/income', config)
        //console.log(data.income)
        dispatch({type:USER_ITEM_SUCCESS, payload:data.income})
    } catch (error) {
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({
        type: USER_ITEM_FAILED,
        payload: message,
        });
    }
}

export const create  = (name, amount) => async(dispatch, getState) =>{
    try {
        dispatch({type:ADD_ITEM_REQUEST})

        const {userLogin:{userInfo}}= getState();

        const config = {
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${userInfo.token}`
            }
        }
        const {data} =  await axios.post("http://localhost:5000/api/income/", {name,amount},config)
        dispatch({type:ADD_ITEM_SUCCESS, payload:data.income})

    } catch (error) {
            const message =
            error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          dispatch({
          type: ADD_ITEM_FAILED,
          payload: message,
          });
    }
}

export const update = (id,name, amount) => async(dispatch, getState) =>{
    try {
        dispatch({type:UPDATE_ITEM_REQUEST})
        const {userLogin:{userInfo}} = getState();

        const config ={
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`http://localhost:5000/api/income/${id}`, {name, amount}, config)
        dispatch({type:UPDATE_ITEM_SUCCESS, payload:data.income})
    } catch (error) {
        const message =
        error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      dispatch({
      type: UPDATE_ITEM_FAILED,
      payload: message,
      });
    }
}

export const deletew = (id) => async(dispatch, getState) =>{
    try {
        dispatch({type:DELETE_ITEM_REQUEST});
        const {userLogin:{userInfo}}= getState();

        const config = {
            headers:{
                "authorization":`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(`http://localhost:5000/api/income/${id}`,config)
        dispatch({type:DELETE_ITEM_SUCCESS, payload:data.income})
    } catch (error) {
        const message =
        error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      dispatch({
      type: UPDATE_ITEM_FAILED,
      payload: message,
      });
    }
}



