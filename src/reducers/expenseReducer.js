import { ADD_EXPENSE_FAILED, ADD_EXPENSE_REQUEST, ADD_EXPENSE_SUCCESS, DELETE_EXPENSE_FAILED, DELETE_EXPENSE_REQUEST, DELETE_EXPENSE_SUCCESS, EXPENSE_ITEM_FAILED, EXPENSE_ITEM_REQUEST, EXPENSE_ITEM_SUCCESS, UPDATE_EXPENSE_FAILED, UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS } from "../constants/expenseConstant";

export const expenseItemReducer = (state={expenses:[]},action) =>{
    switch (action.type) {
        case EXPENSE_ITEM_REQUEST:
            return {loading:true}
        case EXPENSE_ITEM_SUCCESS:
            return {loading:false, expenses:action.payload}
        case EXPENSE_ITEM_FAILED:
            return {loading:false, error:action.payload}
    
        default:
           return state;
    }
}

export const addExpenseReducer = (state={}, action) => {
    switch (action.type) {
        case ADD_EXPENSE_REQUEST:
            return {loading:true}
        case ADD_EXPENSE_SUCCESS:
            return {loading:false, success:true}
        case ADD_EXPENSE_FAILED:
            return {loading:false, error:action.payload}
        default:
            return state;
    }
}

export const updateExpenseReducer = (state={}, action) =>{
    switch (action.type) {
        case UPDATE_EXPENSE_REQUEST:
            return {loading:true}
        case UPDATE_EXPENSE_SUCCESS:
            return {loading:false, success:true}
        case UPDATE_EXPENSE_FAILED:
            return {loading:false, error:action.payload}
        default:
           return state;
    }
}

export const deleteExpenseReducer = (state={}, action) => {
    switch (action.type) {
        case DELETE_EXPENSE_REQUEST:
            return {loading:true}
        case DELETE_EXPENSE_SUCCESS:
            return {loading:false, success:true}
        case DELETE_EXPENSE_FAILED:
            return {loading:false, error:action.payload}
    
        default:
            return state;
    }
}