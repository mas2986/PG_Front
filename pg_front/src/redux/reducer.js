//import {} from './const';

const initialState = {
    products:[]
}

export const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case '':
            return {
                ...state,
                products:'Hola'
            }
        default: return {...state}
    }
}