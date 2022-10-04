import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { addItemReducer, deleteItemReducer, itemReducer, updateItemReducer } from './reducers/itemReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import { addExpenseReducer, deleteExpenseReducer, expenseItemReducer, updateExpenseReducer } from './reducers/expenseReducer';



const reducer = combineReducers({
    //all reducer will be added here
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userItem:itemReducer,
    addItem:addItemReducer,
    updateItem:updateItemReducer,
    deleteItem: deleteItemReducer,
    
    //expense combineReducers
    expenseItem:expenseItemReducer,
    addExpense:addExpenseReducer,
    updateExpense:updateExpenseReducer,
    deleteExpense:deleteExpenseReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store;