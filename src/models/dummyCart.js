import React, { useState } from 'react';
import { Button, List, Modal } from 'antd';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setTotal(total + item.price);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
    setTotal(total - item.price);
  };

  const showCartModal = () => {
    Modal.info({
      title: 'Cart',
      content: (
        <div>
          <List
            bordered
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                {item.name} - ${item.price}
              </List.Item>
            )}
          />
          <p>Total: ${total}</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div>
      <Button onClick={showCartModal}>View Cart</Button>
    </div>
  );
};

export default Cart;
