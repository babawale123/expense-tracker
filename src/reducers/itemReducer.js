import { 
    USER_ITEM_FAILED,
    USER_ITEM_REQUEST, 
    USER_ITEM_SUCCESS,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILED, 
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILED,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILED}
     from "../constants/itemConstant";

export const itemReducer = (state={items:[]}, action) =>{
    switch (action.type) {
        case USER_ITEM_REQUEST:
            return {loading:true}
        case USER_ITEM_SUCCESS:
            return {loading:false, items:action.payload }
        case USER_ITEM_FAILED:
            return {loading:false, error:action.payload }    
        default:
            return state;
    }

}

export const addItemReducer = (state={}, action)=>{
    switch(action.type){
        case ADD_ITEM_REQUEST:
            return {loading:true}
        case ADD_ITEM_SUCCESS:
            return {loading:false, success:true}
        case ADD_ITEM_FAILED:
            return {loading:false, error:action.payload,success:false}
        default:
            return state;
    }
}

export const updateItemReducer = (state={}, action) =>{
    switch (action.type) {
        case UPDATE_ITEM_REQUEST:
            return {loading:true}
        
        case UPDATE_ITEM_SUCCESS:
            return {loading:false, success:true}
        
        case UPDATE_ITEM_FAILED:
            return {loading:false, error:action.payload, success:false}
    
        default:
           return state;
    }
}

export const deleteItemReducer = (state={}, action) =>{
    switch (action.type) {
        case DELETE_ITEM_REQUEST:
            return {loading:true}
            
        case DELETE_ITEM_SUCCESS:
            return {loading:false, success:true}
        
        case DELETE_ITEM_FAILED:
            return {loading:false,error:action.payload}
    
        default:
           return state;
    }
}