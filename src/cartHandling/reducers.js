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
        // Find the product in the cart
            const addProductIndex = state.cart.findIndex(
                (item) => item.name === action.product.name
            );

            // If the product is already in the cart, update its quantity
            if (addProductIndex !== -1) {
                const updatedProduct = {
                ...state.cart[addProductIndex],
                quantity: state.cart[addProductIndex].quantity + 1,
            };
            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, addProductIndex),
                    updatedProduct,
                    ...state.cart.slice(addProductIndex + 1),
                ],
                cartTotal: state.cartTotal + action.product.price,
                cartQuantity: state.cartQuantity + 1,
                };
            }      

            // If the product is not in the cart, add it to the cart with a quantity of 1
            return {
                ...state,
                cart: [...state.cart, { ...action.product, quantity: 1 }],
                cartTotal: state.cartTotal + action.product.price,
                cartQuantity: state.cartQuantity + 1,
            };

        case REMOVE_FROM_CART:
        // Find the product in the cart
            const removeProductIndex  = state.cart.findIndex(
                (item) => item.name === action.product.name
            );

            // If the product is not in the cart, return the state without changes
            if (removeProductIndex  === -1) {
                return state;
            }

            // If the product has a quantity of 1, remove it from the cart
            if (state.cart[removeProductIndex ].quantity === 1) {
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.name !== action.product.name),
                    cartTotal: state.cartTotal - action.product.price,
                    cartQuantity: state.cartQuantity - 1,
                    };
                }

            // If the product has a quantity greater than 1, update its quantity
            const updatedProduct = {
                ...state.cart[removeProductIndex ],
                quantity: state.cart[removeProductIndex ].quantity - 1,
                };
            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, removeProductIndex ),
                    updatedProduct,
                    ...state.cart.slice(removeProductIndex  + 1),
                ],
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