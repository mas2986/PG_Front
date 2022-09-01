import {
  GET_PRODUCTS,
  GET_PAGINATED_PRODUCTS,
  SIGN_UP,
  CHECK_LOGIN,
  ERROR_LOGIN,
  SEARCH_PRODUCT,
  FILTER_SPORT,
  FILTER_BRAND,
  FILTER_GENRE,
  FILTER_NAV_GENDER,
  ORDER_BY,
  DETAIL_PRODUCT,
  ORDER_BY_PRICE,
  ADD_TO_CART,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
} from "./const";

const initialState = {
  products: [],
  altProducts: [],
  user: {},
  errorLogin: "",
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        user: action.payload.user,
      };

    case CHECK_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        altProducts: action.payload,
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
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
    case ORDER_BY:
      let stateProduct = state.products;
      let sortProduct =
        action.payload === "asc"
          ? [...stateProduct].sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : [...stateProduct].sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        products: sortProduct,
        altProducts: sortProduct,
      };

    case ORDER_BY_PRICE:
      let statePrice = state.products;
      let sortPrice =
        action.payload === "asc"
          ? [...statePrice].sort((a, b) => {
              if (a.price > b.price) {
                return 1;
              }
              if (a.price < b.price) {
                return -1;
              }
              return 0;
            })
          : [...statePrice].sort((a, b) => {
              if (a.price > b.price) {
                return -1;
              }
              if (a.price < b.price) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        products: sortPrice,
        altProducts: sortPrice,
      };

    case DETAIL_PRODUCT:
      console.log(action.payload);
      return {
        ...state,
        detail: action.payload,
      };

    case ADD_TO_CART:
      const allProds = state.altProducts;
      const id = action.payload;
      const item = allProds.filter((i) => i.id === id);
      return {
        ...state,
        cartItems: [...state.cartItems, item].flat(),
      };

    case DELETE_FROM_CART:
      const allItems = state.cartItems;
      const index = action.payload;
      const item2 = allItems.filter((e, idx) => idx !== index);
      return {
        ...state,
        cartItems: item2,
      };

    case DELETE_ALL_FROM_CART:
      return {
        ...state,
        cartItems: [],
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

    default:
      return { ...state };
  }
};
