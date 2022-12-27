import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { addToCart } from '../cartHandling/actions';

// const cart = useSelector(state => state.cart);
// const dispatch = useDispatch();
// function handleAddToCart(product) {
//   dispatch(addToCart(product));
// }



const ProductTable = ({categoryID}) => {

  const [products, setProducts] = useState([]);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

  useEffect(() => {
    // fetch("http://localhost:8080/api/ui/0", {method: 'GET'}).then(res => res.json()).then(res =>  setProducts(res)) }, []);
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ui/0');
        setProducts(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, [categoryID]);

  const columns = [
  
    {
      title: 'index',
      width: 100,
      dataIndex: 'product_item_id',
      key: 'product_item_id',
      fixed: 'left',
    },
    {
      title: 'title',
      width: 100,
      dataIndex: 'prduct_id',
      key: 'title',
      fixed: 'left',
    },
    {
      title: 'Availablility',
      dataIndex: 'quantity',
      key: '1',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: '2',
    },
    {
      title: 'Add to Cart',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (text, record) => (
      <a onClick={() => handleAddToCart({name: record.prduct_id, price: record.price, quantity: 1})}>Add</a>
      ),
    },
  ];
  
    return (
  <Table
    columns={columns}
    dataSource={products}
    scroll={{
      x: 300,
    }}
  />
    );
};
export default ProductTable;





// const [products, setProducts] = useState([]);
//     const [loadning, setLoading] = useState(true);

//     React.useEffect(() => {fetch('http://localhost:8080/api/products', {method: 'GET'}).then(res => res.json()).then(res =>  setProducts(res)) }, []);
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 40,
//     address: 'London Park',
//   },

// ];