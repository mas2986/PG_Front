import {SIGN_UP, SEARCH_PRODUCT} from './const';

const initialState = {
    products:[],
    user:[]
}

export const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case SIGN_UP:
            return {
                ...state,
                user:action.payload
            }
        case SEARCH_PRODUCT:
                return {
                    ...state,
                    products:action.payload
                }    
        default: return {...state}
    }
}