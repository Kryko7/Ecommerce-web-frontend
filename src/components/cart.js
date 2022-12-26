import React, { useState , useEffect} from 'react';
import axios from 'axios';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // use effect to fetch items from the server
  useEffect(() => {
    axios.get('/api/cart').then((response) => {
      setCartItems(response.data.items);
      setTotalCost(response.data.totalCost);
    });
  }, []);

  // function to add an item to the cart
  const addToCart = (item) => {
    axios.post('/api/cart', item).then((response) => {
      setCartItems(response.data.items);
      setTotalCost(response.data.totalCost);
    });
  };

  // function to remove an item from the cart
  const removeFromCart = (itemId) => {
    axios.delete(`/api/cart/${itemId}`).then((response) => {
      setCartItems(response.data.items);
      setTotalCost(response.data.totalCost);
    });
  };

  // function to handle checkout
  const handleCheckout = (event) => {
    event.preventDefault();
    axios.post('/api/checkout').then(() => {
      setCartItems([]);
      setTotalCost(0);
    });
  };

//   return (
//     <div>
//       <h1>Cart</h1>
//       {cartItems.length > 0 ? (
//         <>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 {item.name} - {item.price}
//                 <button onClick={() => removeFromCart(item.id)}>
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <p>Total: {totalCost}</p>
//           <form onSubmit={handleCheckout}>
//             <button type="submit">Checkout</button>
//           </form>
//         </>
//       ) : (
//         <p>No items in the cart</p>
//       )}
//     </div>
//   );
return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalCost}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default CartPage;
