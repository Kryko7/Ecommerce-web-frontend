import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, CHECKOUT } from "./actions";    
import { message } from "antd";

const initialState = {
    cart: [],
    cartTotal: 0,
    cartQuantity: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.product],
                cartTotal: state.cartTotal + action.product.price,
                cartQuantity: state.cartQuantity + 1,
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.product.id),
                cartTotal: state.cartTotal - action.product.price,
                cartQuantity: state.cartQuantity - 1,
            };
        case CLEAR_CART:
            message.warning('Your cart is empty');
            return {
                ...state,
                cart: [],
                cartTotal: 0,
                cartQuantity: 0,
            };
        case CHECKOUT:
            return {
                ...state,
                cart: [],
                cartTotal: 0,
                cartQuantity: 0,
            };
        default:
            return state;
    }
};

export default cartReducer;