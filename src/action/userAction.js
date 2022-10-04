import axios from "axios";
import { USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstant"

export const login = (username,password) => async(dispatch) =>{
    try {
        dispatch({type:USER_LOGIN_REQUEST});

        const config ={
            headers:{
                "content-type":"application/json",
            },
        };
        const {data} = await axios.post("http://localhost:5000/api/users/login", {username,password}, config);
        dispatch({type:USER_LOGIN_SUCCESS, payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
        console.log(data)

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  };

export const register = (username,email,passowrd) => async (dispatch, getState) => {
    try {
        dispatch({type:USER_REGISTER_REQUEST});
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`http://localhost:5000/api/users`,{username,email,passowrd});
        dispatch({ type:USER_REGISTER_SUCCESS, payload:data})
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({type:USER_REGISTER_FAILED, payload:message})
    }
}
