import {GET_PRODUCTS, SIGN_UP, SEARCH_PRODUCT, FILTER_SPORT, FILTER_BRAND, FILTER_GENRE} from './const';

const initialState = {
    products:[],
    altProducts: [],
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
                    products: action.payload,
                    altProducts: action.payload
                }   

        case SEARCH_PRODUCT:
                return {
                    ...state,
                    products:action.payload
                }
        case FILTER_SPORT:
                    const allProducts = state.altProducts
                    const filteredSports = action.payload === 'All'? allProducts : allProducts.filter(p => p.sport.includes(action.payload));
                    console.log(filteredSports)
                    return {
                        ...state,
                        products: filteredSports //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
                }            
        case FILTER_BRAND:
                    const allBrands = state.altProducts
                    const filteredBrands = action.payload === 'All'? allBrands : allBrands.filter(p => p.brand.includes(action.payload));
                    console.log(filteredBrands)
                    return {
                        ...state,
                        products: filteredBrands //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
                    }
        case FILTER_GENRE:
                        const allGenres = state.altProducts
                        const filteredGenres = action.payload === 'All'? allGenres : allGenres.filter(g => g.genre.includes(action.payload));
                        console.log(filteredGenres)
                        return {
                            ...state,
                            products: filteredGenres //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
                } 
        
        
        default: return {...state}
    }
}