import { SliderValueLabelUnstyled } from "@mui/base";
import {
  GET_PRODUCTS,
  SIGN_UP,
  SEARCH_PRODUCT,
  FILTER_SPORT,
  FILTER_BRAND,
  FILTER_GENRE,
  FILTER_NAV_GENDER,
} from "./const";

const initialState = {
    products:[],  
    altProducts:[],  
    user:{}
}

export const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case SIGN_UP:
            return {
                ...state,
                user:{...action.payload}
            }
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                altProducts:action.payload
            }
        case SEARCH_PRODUCT:
            return {
                ...state,
                products:action.payload
            }
        case FILTER_SPORT:
            const allProducts = state.altProducts;
            const filteredSports =
            action.payload === "All"
                ? allProducts
                : allProducts.filter((p) => p.sport.includes(action.payload));       
            return {
                ...state,
                products: filteredSports, //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
                };
        case FILTER_BRAND:
            const allBrands = state.altProducts;
            const filteredBrands =
            action.payload === "All"
                ? allBrands
                : allBrands.filter((p) => p.brand.includes(action.payload));
            console.log(filteredBrands);
            return {
                ...state,
            products: filteredBrands, //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
            };
        case FILTER_GENRE:
            const allGenres = state.altProducts;
            const filteredGenres =
            action.payload === "All"
                ? allGenres
                : allGenres.filter((g) => g.genre.includes(action.payload));
            console.log(filteredGenres);
            return {
                ...state,
                products: filteredGenres, //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
            };
            case FILTER_NAV_GENDER:
                let value = action.payload;
                let allGenders = state.altProducts;
                let filteredGender = "";
                let filteredProduct = "";
                if (value.includes("women")) {
                filteredGender = allGenders.filter((g) =>
                    g.genre.toLowerCase().includes("female")
                );
                console.log(value);
                if (value.includes("jersey")) {
                    filteredProduct = filteredGender.filter((prods) =>
                    prods.title.includes("jersey")
                    );
                } else if (value.includes("shorts")) {
                filteredProduct = filteredGender.filter((prods) =>
                    prods.title.includes("shorts")
                );
                } else if (value.includes("boots")) {
                    filteredProduct = filteredGender.filter((prods) =>
                    prods.title.includes("boots")
                );
                } else {
                    filteredProduct = filteredGender.filter(
                    (prods) =>
                        !prods.title.includes("jersey") &&
                        !prods.title.includes("shorts") &&
                        !prods.title.includes("boots")
                    );
                }
            } else if (value.includes("men")) {
              filteredGender = allGenders.filter(
                (g) => g.genre.toLowerCase() == "male"
              );
              console.log(value);
              if (value.includes("jersey")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("jersey")
                );
              } else if (value.includes("shorts")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("shorts")
                );
              } else if (value.includes("boots")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("boots")
                );
              } else {
                filteredProduct = filteredGender.filter(
                  (prods) =>
                    !prods.title.includes("jersey") &&
                    !prods.title.includes("shorts") &&
                    !prods.title.includes("boots")
                );
              }
            } else if (value.includes("kids")) {
              filteredGender = allGenders.filter((g) =>
                g.genre.toLowerCase().includes("kids")
              );
              console.log(value);
              if (value.includes("jersey")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("jersey")
                );
              } else if (value.includes("shorts")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("shorts")
                );
              } else if (value.includes("boots")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("boots")
                );
              } else {
                filteredProduct = filteredGender.filter(
                  (prods) =>
                    !prods.title.includes("jersey") &&
                    !prods.title.includes("shorts") &&
                    !prods.title.includes("boots")
                );
              }
            } else if (value.includes("sports")) {
              filteredGender = allGenders;
              console.log(value);
              if (value.includes("soccer")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("soccer")
                );
              } else if (value.includes("basketball")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("basketball")
                );
              } else if (value.includes("tennis")) {
                filteredProduct = filteredGender.filter((prods) =>
                  prods.title.includes("tennis")
                );
              } else {
                filteredProduct = filteredGender.filter(
                  (prods) =>
                    !prods.title.includes("soccer") &&
                    !prods.title.includes("tennis") &&
                    !prods.title.includes("basketball")
                );
              }
            }
            console.log(filteredProduct);
      
            return {
              ...state,
              products: filteredProduct,
            };
      
        default: return {...state}
    }
}