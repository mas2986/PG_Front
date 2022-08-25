import {SIGN_UP} from './const';

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
        default: return {...state}
    }
}