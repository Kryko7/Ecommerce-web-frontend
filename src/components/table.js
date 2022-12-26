import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import {cartHandler} from '../sillyfunctions/cartHandler';
import cartHelper from '../sillyfunctions/cartHelper';


const {addToCart } = cartHelper;


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
    <a onClick={() => addToCart({name: '123', price: 1, quantity: 1})}>Add</a>
    ),
  },
];

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
const ProductTable = ({categoryID}) => {

  const [products, setProducts] = useState([]);
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