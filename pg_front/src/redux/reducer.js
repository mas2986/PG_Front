import Swal from "sweetalert2";
import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  GET_PAGINATED_PRODUCTS,
  SIGN_UP,
  CHECK_LOGIN,
  LOGOUT,
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
  UPDATE_ITEM_NUM,
  REMOVE_DUPLICATES_CART,
  CREATE_USER,
  GET_ALL_USERS,
  CHANGE_ROLE_USER,
  DELETE_USER,
  ADD_TO_CART_DETAIL,
  FILTER_BRAND_CAROUSEL,
  REMEMBER_PASSWORD,
  RESET_PASSWORD,
  ORDER_MERCADOPAGO,
  GET_REVIEWS,
} from "./const";

const initialState = {
  products: [],
  altProducts: [],
  user: {},
  users: [],
  errorLogin: "",
  cartItems: [],
  qty: 1,
  password: {},
  backup: [],
  url: "",
  reviews: [],
};

export const rootReducer = (state = initialState, action) => {
  let productsAll = state.products;
  if (productsAll.length === 0) {
    productsAll = state.altProducts;
    // console.log(productsAll)
  }
  switch (action.type) {
    case ORDER_MERCADOPAGO:
      return {
        ...state,
        url: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case REMEMBER_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SIGN_UP:
      return {
        ...state,
        user: action.payload.user,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case CHECK_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      localStorage.clear();
      console.log("LOGOUT");
      return {
        ...state,
        user: {},
        cartItems: [],
      };

    case CREATE_USER:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case CHANGE_ROLE_USER:
      console.log(action.payload);
      return {
        ...state,
      };
    case DELETE_USER:
      console.log(action.payload);
      return {
        ...state,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        altProducts: action.payload,
        backup: action.payload,
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    case FILTER_SPORT:
      const filteredSports = productsAll.filter((p) =>
        p.sport.includes(action.payload)
      );

      return {
        ...state,
        products: action.payload === "All" ? state.backup : filteredSports, //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
      };
    case FILTER_BRAND:
      const filteredBrands = productsAll.filter((p) =>
        p.brand.includes(action.payload)
      );
      return {
        ...state,
        products: action.payload === "All" ? state.backup : filteredBrands, //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
      };
    case FILTER_GENRE:
      const actions = action.payload;
      let filterBrands = "";
      if (actions === "Male" || actions === "male")
        filterBrands = productsAll.filter((m) =>
          m.genre.includes(action.payload)
        );
      if (actions === "Female" || actions === "female")
        filterBrands = productsAll.filter((m) =>
          m.genre.includes(action.payload)
        );
      if (actions === "Kids" || actions === "kids")
        filterBrands = productsAll.filter((m) =>
          m.genre.includes(action.payload)
        );
      if (actions === "Adults" || actions === "adults")
        filterBrands = productsAll.filter((m) =>
          m.genre.includes(action.payload)
        );
      if (actions === "None" || actions === "none")
        filterBrands = productsAll.filter((m) =>
          m.genre.includes(action.payload)
        );
      if (actions === "Unisex" || actions === "unisex")
        filterBrands = productsAll.filter((m) =>
          m.genre.includes(action.payload)
        );
      //state.products.filter((g) => g.genre.includes(action.payload));

      //const women = state.altProducts.filter((g) => g.genre.includes(action.payload));
      return {
        ...state,
        products: action.payload === "All" ? state.backup : filterBrands,
        //products: women //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
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
        // altProducts: sortPrice,
      };

    case DETAIL_PRODUCT:
      console.log(action.payload);
      return {
        ...state,
        detail: action.payload,
      };

    case ADD_TO_CART:
      const allProds = state.altProducts;
      const cart = state.cartItems;
      const id = action.payload;
      console.log(state.cartItems);
      if (cart.some((c) => c.id === id)) {
        Swal.fire({
          title: "You already have this item in the cart!",
          text: "Please change the quantity to order from the cart",
          icon: "Error",
          confirmButtonText: "Back",
        });
        return {
          ...state,
        };
      }
      const item = allProds.filter((i) => i.id === id);
      let finalItem = item.map(
        (i) =>
          (i.qty = cart.some((c) => c.id == id) ? parseInt(state.qty) + 1 : 1)
      );
      return {
        ...state,
        cartItems: [...state.cartItems, item].flat(),
      };

    case ADD_TO_CART_DETAIL:
      const detail = state.detail;
      const cartI = state.cartItems;
      //console.log(state.cartItems)
      if (cartI.some((c) => c.id === detail.id)) {
        Swal.fire({
          title: "You already have this item in the cart!",
          text: "Please change the quantity to order from the cart",
          icon: "error",
          confirmButtonText: "Back",
        });
      }

      return {
        ...state,
        cartItems: [...cartI].concat(detail),
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

    case REMOVE_DUPLICATES_CART:
      const dupsFree = state.cartItems.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );
      return {
        ...state,
        cartItems: dupsFree,
      };

    case UPDATE_ITEM_NUM:
      // let [itemId, itemQty] = action.payload;
      // if (state.cartItems.some((i) => i.id == itemId)) {
      //   let updatedQty = cartItems
      //     .filter((c) => c.id === itemId)
      //     .map((i) => (i.qty = itemQty));
      // }
      return {
        ...state,
        qty: action.payload,
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
              !prods.title.includes("Soccer") &&
              !prods.title.includes("tennis") &&
              !prods.title.includes("Tennis") &&
              !prods.title.includes("basketball")
          );
        }
      }
      console.log(filteredProduct);

      return {
        ...state,
        products: filteredProduct,
      };
    case FILTER_BRAND_CAROUSEL:
      const carouselBrands = state.altProducts.filter((p) =>
        p.brand.includes(action.payload)
      );
      return {
        ...state,
        products: carouselBrands, //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
      };

    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return { ...state };
  }
};
