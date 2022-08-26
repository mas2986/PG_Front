import {SIGN_UP, GET_PRODUCTS} from './const';

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
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }
        default: return {...state}
    }
}