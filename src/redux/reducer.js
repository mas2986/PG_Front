import {GET_PRODUCTS, SIGN_UP, SEARCH_PRODUCT, FILTER_SPORT, FILTER_BRAND, FILTER_GENRE, ORDER_BY, ORDER_BY_PRICE } from './const';

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
                     return {
                        ...state,
                        products: filteredSports //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
                    };        
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
                case ORDER_BY:
                    let stateProduct = state.products
                    let sortProduct = action.payload === 'asc' ?[...stateProduct].sort((a, b) => {if(a.title > b.title){return 1;} if(a.title < b.title){return -1;} return 0;}) : [...stateProduct].sort((a, b) =>  {if(a.title > b.title){return -1;} if(a.title < b.title){return 1;} return 0;});
                   
                    return {
                        ...state,
                        products: sortProduct
                        
                    }       
                
                    case ORDER_BY_PRICE:
                        let statePrice = state.products
                        let sortPrice = action.payload === 'asc' ?[...statePrice].sort((a, b) => {if(a.price > b.price){return 1;} if(a.price < b.price){return -1;} return 0;}) : [...statePrice].sort((a, b) =>  {if(a.price > b.price){return -1;} if(a.price < b.price){return 1;} return 0;});
                       
                        return {
                            ...state,
                            products: sortPrice
                            
                        }    
        
        default: return {...state}
    }
}