import React, {useState} from "react";
import {message} from "antd";

export class cartHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          cart: [],
          cartTotal: 0,
          cartQuantity: 0,
        };
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.clearCart = this.clearCart.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    addToCart(product) {
        this.setState((state) => ({
          cart: [...state.cart, product],
          cartTotal: state.cartTotal + product.price,
          cartQuantity: state.cartQuantity + 1,
        }));
      }

    removeFromCart(product) {
        this.setState((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          cartTotal: state.cartTotal - product.price,
          cartQuantity: state.cartQuantity - 1,
        }));
    }

    clearCart() {
        this.setState({
          cart: [],
          cartTotal: 0,
          cartQuantity: 0,
        });
    }

    handleCheckout() {
        if (this.state.cart.length === 0) {
          message.warning('Your cart is empty');
          return;
        }
        // Implement the checkout process here, e.g. send a request to the server to process the payment
        this.setState({
          cart: [],
          cartTotal: 0,
          cartQuantity: 0,
        });
        message.success('Checkout successful');
    }
}

// export default cartHandler;


//     const [cart, setCart] = useState([]);
//     const [cartTotal, setCartTotal] = useState(0);
//     const [cartQuantity, setCartQuantity] = useState(0);

//     const addToCart = (product) => {
//         setCart([...cart, product]);
//         calculateCartTotal();
//     }

//     const removeFromCart = (product) => {
//         setCart(cart.filter(item => item.id !== product.id));
//         calculateCartTotal();
//     }

//     const clearCart = () => {
//         setCart([]);
//         setCartTotal(0);
//     }

//     const updateCartQuantity = (index, quantity) => {
//         const updatedCart = [...cart];
//         updatedCart[index].quantity = quantity;
//         setCart(updatedCart);
//         calculateCartTotal();
//     }

//     const calculateCartTotal = () => {
//         let total = 0;
//         cart.forEach(item => {
//             total += item.price * item.quantity;
//         })
//         setCartTotal(total);
//     }


// }

// export { cartHandler }